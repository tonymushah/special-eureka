export class Status{
    private static ONGOING = "ongoing";
    private static COMPLETED = "completed";
    private static HIATUS = "hiatus";
    private static CANCELLED = "cancelled";
    public static ongoing(): string{
        return Status.ONGOING;
    }
    public static completed(): string{
        return Status.COMPLETED;
    }
    public static hiatus(): string{
        return Status.HIATUS;
    }
    public static cancelled(): string{
        return Status.CANCELLED;
    }
    public static array(): Array<string>{
        return [
            Status.ONGOING,
            Status.COMPLETED,
            Status.HIATUS,
            Status.CANCELLED
        ];
    }
}