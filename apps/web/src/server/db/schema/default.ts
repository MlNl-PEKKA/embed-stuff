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
      emote: {
        Row: {
          created_at: string;
          emoji: string;
          id: string;
          is_pro: boolean;
          name: string;
          user_id: string | null;
          visibility: Database["public"]["Enums"]["emote_visibility"];
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: string;
          is_pro?: boolean;
          name: string;
          user_id?: string | null;
          visibility?: Database["public"]["Enums"]["emote_visibility"];
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: string;
          is_pro?: boolean;
          name?: string;
          user_id?: string | null;
          visibility?: Database["public"]["Enums"]["emote_visibility"];
        };
        Relationships: [
          {
            foreignKeyName: "emote_created_by_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      form: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["form_status"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["form_status"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["form_status"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "form_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      form_emote: {
        Row: {
          created_at: string;
          emote_id: string;
          form_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          emote_id: string;
          form_id: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          emote_id?: string;
          form_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "form_emote_emote_id_fkey";
            columns: ["emote_id"];
            isOneToOne: false;
            referencedRelation: "emote";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "form_emote_emote_id_fkey";
            columns: ["emote_id"];
            isOneToOne: false;
            referencedRelation: "emote_option";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "form_emote_form_id_fkey";
            columns: ["form_id"];
            isOneToOne: false;
            referencedRelation: "form";
            referencedColumns: ["id"];
          },
        ];
      };
      reaction: {
        Row: {
          created_at: string;
          form_emote_id: string;
          id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          form_emote_id: string;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          form_emote_id?: string;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reaction_form_emote_id_fkey";
            columns: ["form_emote_id"];
            isOneToOne: false;
            referencedRelation: "form_emote";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reaction_user_id_fkey";
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
    Views: {
      emote_option: {
        Row: {
          created_at: string | null;
          emoji: string | null;
          form_id: string[] | null;
          id: string | null;
          is_pro: boolean | null;
          name: string | null;
          user_id: string | null;
          visibility: Database["public"]["Enums"]["emote_visibility"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "emote_created_by_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      emote_visibility: "public" | "private";
      form_status: "active" | "inactive";
      project_status: "active" | "inactive";
      user_membership: "free" | "pro";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
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
