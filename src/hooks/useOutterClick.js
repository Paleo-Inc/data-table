import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
    const handleChange = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleChange);

        return () => {
            document.removeEventListener("mousedown", null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
}

export default useClickOutside;