export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emote: {
        Row: {
          created_at: string
          created_by: string | null
          emoji: string
          id: string
          name: string
          type: string
          url: string | null
          visibility: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          emoji?: string
          id?: string
          name?: string
          type?: string
          url?: string | null
          visibility?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          emoji?: string
          id?: string
          name?: string
          type?: string
          url?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "emote_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      kit: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          visibility: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "kit_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_emote: {
        Row: {
          created_at: string
          emote_id: string
          id: string
          kit_id: string | null
        }
        Insert: {
          created_at?: string
          emote_id: string
          id?: string
          kit_id?: string | null
        }
        Update: {
          created_at?: string
          emote_id?: string
          id?: string
          kit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kit_emote_emote_id_fkey"
            columns: ["emote_id"]
            isOneToOne: false
            referencedRelation: "emote"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kit_emote_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kit"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          id: string
          name: string | null
          status: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          status?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          status?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      project_kit: {
        Row: {
          created_at: string
          id: string
          kit_id: string
          project_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kit_id: string
          project_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kit_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_kit_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_kit_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      reaction: {
        Row: {
          created_at: string
          id: string
          kit_emote_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kit_emote_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kit_emote_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reaction_kit_emote_id_fkey"
            columns: ["kit_emote_id"]
            isOneToOne: false
            referencedRelation: "kit_emote"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reaction_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string | null
          membership: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name?: string | null
          membership?: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string | null
          membership?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

