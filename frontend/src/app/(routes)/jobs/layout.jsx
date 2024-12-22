import {default as LayoutComponent} from "@/components/Layout/Layout"

export default function Layout({children}) {
    return (
        <LayoutComponent>
            {children}
        </LayoutComponent>
    )
}