import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1. Immediate reset
        window.scrollTo(0, 0);
        if (document.documentElement) {
            document.documentElement.scrollTop = 0;
        }
        if (document.body) {
            document.body.scrollTop = 0;
        }

        // 2. Micro-task reset (ensures it runs after React render)
        const timeoutId = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant' as any,
            });
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
}
