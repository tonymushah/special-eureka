export class And_Or{
    private static AND = "AND";
    private static OR = "OR";
    public static and():string{
        return And_Or.AND;
    }
    public static or():string{
        return And_Or.OR;
    }
    public static array(): Array<string>{
        return [
            And_Or.AND, 
            And_Or.OR
        ];
    }
}
