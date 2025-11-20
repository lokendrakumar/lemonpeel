import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Details | LemonPeel',
  description: 'View detailed information about your project including progress, team members, and milestones.',
};

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
