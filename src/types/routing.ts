// Next.js App Router types for pages and layouts

export interface PageProps {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Promise<{ [key: string]: string | string[] }>;
}

// Specific page prop types
export interface DashboardPageProps extends PageProps {
  // Add dashboard-specific props if needed
}

export interface AuthPageProps extends PageProps {
  // Add auth page-specific props if needed
}

// Metadata types
export interface MetadataProps {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Common page component type
export type NextPage<P = {}> = React.FC<P>;

// Page component type with params (for dynamic routes)
export type NextPageWithParams<P = {}> = React.FC<P & PageProps>;

// Layout component type
export type NextLayout<P = {}> = React.FC<P & LayoutProps>;