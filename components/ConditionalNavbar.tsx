'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import WorkspaceNavbar from './WorkspaceNavbar';
import { useAuth } from '@/context/AuthContext';

export default function ConditionalNavbar() {
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();

    // Don't render anything while checking auth status
    if (loading) {
        return null;
    }

    // Don't show navbar if user is not logged in
    

    // Show WorkspaceNavbar on project detail pages (/projects/[id])
    const isProjectDetailPage = pathname && /^\/projects\/\d+$/.test(pathname);

    // Show regular Navbar on projects list page (/projects)
    const isProjectsListPage = pathname === '/projects';

    if (isProjectsListPage) {
        return <WorkspaceNavbar />;
    }
    if (!isAuthenticated) {
        return null;
    }
    if (isProjectDetailPage) {
        return <Navbar />;
    }

    return null;
}
