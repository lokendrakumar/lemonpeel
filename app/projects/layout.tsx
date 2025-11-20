import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | LemonPeel',
  description: 'Manage your projects and track progress with LemonPeel analytics.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
