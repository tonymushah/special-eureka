use diesel::{
    QueryResult, RunQueryDsl, SqliteConnection,
    query_builder::{AstPass, Query, QueryFragment, QueryId},
    query_dsl::methods::LoadQuery,
    sql_types::BigInt,
    sqlite::Sqlite,
};

pub trait Paginate: Sized {
    fn paginate(self, offset: i64, limit: i64) -> Paginated<Self>;
    fn paginate_by_page(self, page: i64, page_size: i64) -> Paginated<Self> {
        self.paginate(page * page_size, page_size)
    }
}

impl<T> Paginate for T {
    fn paginate(self, offset: i64, limit: i64) -> Paginated<Self> {
        Paginated {
            query: self,
            limit,
            offset,
        }
    }
}

pub const DEFAULT_PER_PAGE: i64 = 10;

#[derive(Debug, Clone, Copy, QueryId)]
pub struct Paginated<T> {
    query: T,
    limit: i64,
    offset: i64,
}

impl<T> Paginated<T> {
    pub fn per_page(self, per_page: i64) -> Self {
        Paginated {
            offset: self.offset + (per_page * self.limit),
            ..self
        }
    }
    pub fn next(self) -> Self {
        Paginated {
            offset: self.offset + self.limit,
            ..self
        }
    }
    pub fn get_limit(&self) -> i64 {
        self.limit
    }
    pub fn get_offset(&self) -> i64 {
        self.offset
    }
}

impl<T> QueryFragment<Sqlite> for Paginated<T>
where
    T: QueryFragment<Sqlite>,
{
    fn walk_ast<'b>(&'b self, mut out: AstPass<'_, 'b, Sqlite>) -> QueryResult<()> {
        out.push_sql("SELECT *, COUNT(*) OVER () FROM (");
        self.query.walk_ast(out.reborrow())?;
        out.push_sql(") as paged_query_with LIMIT ");
        out.push_bind_param::<BigInt, i64>(&self.limit)?;
        out.push_sql(" OFFSET ");
        out.push_bind_param::<BigInt, i64>(&self.offset)?;
        Ok(())
    }
}

impl<T: Query> Query for Paginated<T> {
    type SqlType = (T::SqlType, BigInt);
}

impl<T> RunQueryDsl<SqliteConnection> for Paginated<T> {}

impl<T> Paginated<T> {
    pub fn load_data<'a, U>(self, conn: &mut SqliteConnection) -> QueryResult<(Vec<U>, i64)>
    where
        Self: LoadQuery<'a, SqliteConnection, (U, i64)>,
    {
        let results = self.load::<(U, i64)>(conn)?;
        let total = results.first().map(|x| x.1).unwrap_or(0);
        let records = results.into_iter().map(|x| x.0).collect();
        Ok((records, total))
    }
}
