export class Reading_status{
    public static reading(): string{
        return "reading";
    }
    public static on_hold(): string{
        return "on_hold";
    }
    public static plan_to_read(): string{
        return "plan_to_read";
    }
    public static dropped(): string{
        return "dropped";
    }
    public static re_reading(): string{
        return "re_reading";
    }
    public static completed(): string{
        return "completed";
    }
    public static array(): Array<string>{
        return [
            Reading_status.reading(),
            Reading_status.on_hold(),
            Reading_status.plan_to_read(),
            Reading_status.dropped(),
            Reading_status.re_reading(),
            Reading_status.completed()
        ];
    }
}