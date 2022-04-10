import { createContext, useContext, useState } from "react";


const DEFAULT_DATA = [];
const DEFAULT_HEADER = [];

export const tableContext = createContext({
    header: [],
    setHeader: () => { },

    data: [],
    setData: () => { },

    selectRows: () => { },
    clear: () => { },
})

export function TableContextProvider({ children }) {
    const [header, setHeaderLocal] = useState(DEFAULT_HEADER);
    const [data, setDataLocal] = useState(DEFAULT_DATA);

    const setHeader = (data) => {
        setHeaderLocal(data);
    }
    const setData = (data) => {
        setDataLocal(data);
    }


    const selectRows = () => {
        //do something
        //setData([]);
    }

    const clear = () => {
        setData([])
    }

    return (<tableContext.Provider value={{
        header, setHeader, data, setData, selectRows, clear
    }}>
        {children}
    </tableContext.Provider>);
}

export function useTableContext() {
    const { header, setHeader, data, setData, selectRows, clear } = useContext(tableContext);
    return { header, setHeader, data, setData, selectRows, clear };
}