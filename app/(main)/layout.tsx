// "use client"

import NavigationSidebar from "@/components/navigation/navigation-sidebar"
// The children prop represents the content passed to this layout component. In React, the children prop is a special prop that allows you to pass components or elements as children to another component.

// React.ReactNode is a flexible type that allows you to use various types of content as children in your React components. It's commonly used when defining the children prop in React components to indicate that the component can accept a diverse set of content.

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="h-full">
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                    <NavigationSidebar />
                </div>
                <main className="md:pl-[72px] h-full">
                    {children}
                </main>
            </div>
        </>
    )
}