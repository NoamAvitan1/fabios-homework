export interface User{
        date: string;
        time: string;
        branch: string;
        customer: string;
        status: string;
        id: string;
        notes: string | null;
        prediction: boolean;
        branch_id: number;
        order_type: string | null;
        event_id: number | null;
        // Other properties...
        updated_at: string;
}