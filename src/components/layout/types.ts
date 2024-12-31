export interface HeaderProps {
  showGetStarted?: boolean;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  showGetStarted?: boolean;
}

export interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

export interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}