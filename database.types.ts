export type Database = {
  public: {
    Tables: {
      __raw_logs: {
        Row: {
          application_name: string | null
          correlation_id: string | null
          cpu_usage: number | null
          custom_field_1: string | null
          custom_field_2: string | null
          environment: string | null
          error_code: string | null
          exception_type: string | null
          execution_time: number | null
          hostname: string | null
          http_method: string | null
          id: number
          ip_address: string | null
          log_level: string | null
          logger_name: string | null
          memory_usage: number | null
          message: string
          nextUrl: string | null
          request_cookies: string | null
          request_geo: string | null
          request_headers: JSON | null
          request_id: string | null
          response_time: number | null
          service_name: string | null
          session_id: string | null
          stack_trace: string | null
          thread_id: string | null
          timestamp: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          application_name?: string | null
          correlation_id?: string | null
          cpu_usage?: number | null
          custom_field_1?: string | null
          custom_field_2?: string | null
          environment?: string | null
          error_code?: string | null
          exception_type?: string | null
          execution_time?: number | null
          hostname?: string | null
          http_method?: string | null
          id?: number
          ip_address?: string | null
          log_level?: string | null
          logger_name?: string | null
          memory_usage?: number | null
          message: string
          nextUrl?: string | null
          request_cookies?: string | null
          request_geo?: string | null
          request_headers?: JSON | null
          request_id?: string | null
          response_time?: number | null
          service_name?: string | null
          session_id?: string | null
          stack_trace?: string | null
          thread_id?: string | null
          timestamp?: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          application_name?: string | null
          correlation_id?: string | null
          cpu_usage?: number | null
          custom_field_1?: string | null
          custom_field_2?: string | null
          environment?: string | null
          error_code?: string | null
          exception_type?: string | null
          execution_time?: number | null
          hostname?: string | null
          http_method?: string | null
          id?: number
          ip_address?: string | null
          log_level?: string | null
          logger_name?: string | null
          memory_usage?: number | null
          message?: string
          nextUrl?: string | null
          request_cookies?: string | null
          request_geo?: string | null
          request_headers?: JSON | null
          request_id?: string | null
          response_time?: number | null
          service_name?: string | null
          session_id?: string | null
          stack_trace?: string | null
          thread_id?: string | null
          timestamp?: string
          url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      __raw_trends: {
        Row: {
          created_at: string
          filters: string | null
          html: string | null
          id: number
          scenario: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          filters?: string | null
          html?: string | null
          id?: number
          scenario?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          filters?: string | null
          html?: string | null
          id?: number
          scenario?: string | null
          url?: string | null
        }
        Relationships: []
      }
      authors: {
        Row: {
          avatar_id: string | null
          avatar_url: string | null
          created_at: string
          created_by: string | null
          display_name: string | null
          href: string | null
          id: string
          twitter_handle: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_id?: string | null
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          display_name?: string | null
          href?: string | null
          id?: string
          twitter_handle?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_id?: string | null
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          display_name?: string | null
          href?: string | null
          id?: string
          twitter_handle?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'authors_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          last_updated: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
      chroniconl__trendy__url_history: {
        Row: {
          body_content_only: string | null
          created_at: string
          full_url: string | null
          head_content_only: string | null
          id: number
          page_title: string | null
          raw_contents: string | null
        }
        Insert: {
          body_content_only?: string | null
          created_at?: string
          full_url?: string | null
          head_content_only?: string | null
          id?: number
          page_title?: string | null
          raw_contents?: string | null
        }
        Update: {
          body_content_only?: string | null
          created_at?: string
          full_url?: string | null
          head_content_only?: string | null
          id?: number
          page_title?: string | null
          raw_contents?: string | null
        }
        Relationships: []
      }
      contact_form: {
        Row: {
          created_at: string
          email: string | null
          id: string
          internal__date_views: string | null
          internal__status: string | null
          message: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          internal__date_views?: string | null
          internal__status?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          internal__date_views?: string | null
          internal__status?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          content: string | null
          created_at: string
          id: string
          last_updated: string | null
          slug: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          last_updated?: string | null
          slug?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          last_updated?: string | null
          slug?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'legal_documents_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      post_tag_relationship: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          post_id: string | null
          tag_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          post_id?: string | null
          tag_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          post_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'post_tag_relationship_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_tag_relationship_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_tag_relationship_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          character_count: number | null
          content: string | null
          content_text_only: string | null
          created_at: string
          description: string | null
          id: string
          image_alt: string | null
          image_caption: string | null
          image_id: string | null
          image_url: string | null
          last_updated: string | null
          publish_date_day: string | null
          publish_date_time: string | null
          slug: string | null
          title: string | null
          user_id: string | null
          visibility: string | null
          word_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          character_count?: number | null
          content?: string | null
          content_text_only?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_caption?: string | null
          image_id?: string | null
          image_url?: string | null
          last_updated?: string | null
          publish_date_day?: string | null
          publish_date_time?: string | null
          slug?: string | null
          title?: string | null
          user_id?: string | null
          visibility?: string | null
          word_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          character_count?: number | null
          content?: string | null
          content_text_only?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_caption?: string | null
          image_id?: string | null
          image_url?: string | null
          last_updated?: string | null
          publish_date_day?: string | null
          publish_date_time?: string | null
          slug?: string | null
          title?: string | null
          user_id?: string | null
          visibility?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'posts_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'authors'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      repo_trends: {
        Row: {
          __raw_trend_id: number | null
          created_at: string
          description: string | null
          forks: string | null
          fullName: string | null
          id: number
          language: string | null
          last_validated: string | null
          name: string | null
          stars: string | null
          url: string
        }
        Insert: {
          __raw_trend_id?: number | null
          created_at?: string
          description?: string | null
          forks?: string | null
          fullName?: string | null
          id?: number
          language?: string | null
          last_validated?: string | null
          name?: string | null
          stars?: string | null
          url: string
        }
        Update: {
          __raw_trend_id?: number | null
          created_at?: string
          description?: string | null
          forks?: string | null
          fullName?: string | null
          id?: number
          language?: string | null
          last_validated?: string | null
          name?: string | null
          stars?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: '__repo_trends___raw_trend_id_fkey'
            columns: ['__raw_trend_id']
            isOneToOne: false
            referencedRelation: '__raw_trends'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          last_updated: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          slug?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tags_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          provider: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          provider?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          provider?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          created_at: string
          id: string
          logo_alt_text: string | null
          logo_id: string | null
          logo_url: string | null
          post__settings__wordcloud_stop_words: string[] | null
          robots_txt: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_alt_text?: string | null
          logo_id?: string | null
          logo_url?: string | null
          post__settings__wordcloud_stop_words?: string[] | null
          robots_txt?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_alt_text?: string | null
          logo_id?: string | null
          logo_url?: string | null
          post__settings__wordcloud_stop_words?: string[] | null
          robots_txt?: string | null
          website_url?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
