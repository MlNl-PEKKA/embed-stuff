export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      banner_project: {
        Row: {
          created_at: string;
          id: string;
          status: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "banner_project_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      feedback_page: {
        Row: {
          created_at: string;
          feedback_project_id: string;
          id: string;
          meta: Json | null;
          order: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          feedback_project_id?: string;
          id?: string;
          meta?: Json | null;
          order: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          feedback_project_id?: string;
          id?: string;
          meta?: Json | null;
          order?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_page_feedback_project_id_fkey";
            columns: ["feedback_project_id"];
            isOneToOne: false;
            referencedRelation: "feedback_project";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_page_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      feedback_project: {
        Row: {
          created_at: string;
          id: string;
          status: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_project_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      feedback_question: {
        Row: {
          created_at: string;
          description: string | null;
          feedback_page_id: string | null;
          feedback_project_id: string;
          id: string;
          order: number | null;
          required: boolean;
          status: Database["public"]["Enums"]["feedback_question_status"];
          title: string;
          type: Database["public"]["Enums"]["feedback_question_type"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          feedback_page_id?: string | null;
          feedback_project_id?: string;
          id?: string;
          order?: number | null;
          required?: boolean;
          status?: Database["public"]["Enums"]["feedback_question_status"];
          title: string;
          type?: Database["public"]["Enums"]["feedback_question_type"];
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          feedback_page_id?: string | null;
          feedback_project_id?: string;
          id?: string;
          order?: number | null;
          required?: boolean;
          status?: Database["public"]["Enums"]["feedback_question_status"];
          title?: string;
          type?: Database["public"]["Enums"]["feedback_question_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_question_feedback_page_id_fkey";
            columns: ["feedback_page_id"];
            isOneToOne: false;
            referencedRelation: "feedback_page";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_question_feedback_project_id_fkey";
            columns: ["feedback_project_id"];
            isOneToOne: false;
            referencedRelation: "feedback_project";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feedback_question_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      poll_project: {
        Row: {
          created_at: string;
          id: string;
          status: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "poll_project_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      reaction_project: {
        Row: {
          created_at: string;
          id: string;
          status: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["project_status"];
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reaction_project_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          image: string | null;
          membership: Database["public"]["Enums"]["user_membership"];
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          image?: string | null;
          membership?: Database["public"]["Enums"]["user_membership"];
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          image?: string | null;
          membership?: Database["public"]["Enums"]["user_membership"];
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      feedback_question_status: "archived" | "active";
      feedback_question_type: "text" | "select" | "checkbox" | "level";
      project_status: "active" | "inactive";
      project_type: "feedback" | "banner" | "poll" | "reaction";
      user_membership: "free" | "pro";
    };
    CompositeTypes: Record<never, never>;
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
