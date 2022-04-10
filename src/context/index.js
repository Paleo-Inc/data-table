import { createContext, useContext, useState } from "react";


const DEFAULT_DATA = [];
const DEFAULT_HEADER = [];
const DEFAULT_UI = {
    theme: "rgb(19,87,248)"
};

const DEFAULT_SELECTED = {
    from: {
        x: null,
        y: null
    },
    to: {
        x: null,
        y: null
    }
}


export const tableContext = createContext({
    ui: {},
    setUi: () => { },

    header: [],
    setHeader: () => { },

    data: [],
    setData: () => { },

    mouseDown: false,
    onMouseDown: () => { },


    selected: DEFAULT_SELECTED,

    selectRows: () => { },
    clear: () => { },
})

export function TableContextProvider({ children }) {
    const [selected, setSelected] = useState(DEFAULT_SELECTED);
    const [ui, setUi] = useState(DEFAULT_UI);
    const [header, setHeader] = useState(DEFAULT_HEADER);
    const [data, setData] = useState(DEFAULT_DATA);
    const [mouseDown, setMouseDown] = useState(false);


    /* this function will */
    const selectRows = (type = "from", x = null, y = null) => {
        if (type === "from") {
            setSelected({ ...selected, from: { x, y } });
        }
        else if (type === "reset") {
            setSelected({ from: { x, y }, to: { x: null, y: null } });
        }
        else if (type === "to") {
            setSelected({ ...selected, to: { x, y } });
        }
        else if (type === "mouseup") {
            // swap if required
            setSelected({
                from: {
                    x: Math.min(selected.from.x, selected.to.x),
                    y: Math.min(selected.from.y, selected.to.y),
                },
                to: {
                    x: Math.max(selected.from.x, selected.to.x),
                    y: Math.max(selected.from.y, selected.to.y),
                }
            });
        }
    }

    const onMouseDown = (event) => {
        setMouseDown(event.type === "mousedown");
    }



    const clear = () => {
        setData([]);
        setHeader([]);
    }

    return (<tableContext.Provider value={{
        ui, setUi,
        header, setHeader,
        data, setData,
        selected, selectRows,
        mouseDown, onMouseDown,
        clear
    }}>
        {children}
    </tableContext.Provider>);
}

export function useTableContext() {
    const {
        ui, setUi,
        header, setHeader,
        data, setData,
        selected, selectRows,
        mouseDown, onMouseDown,
        clear
    } = useContext(tableContext);
    return {
        ui, setUi,
        header, setHeader,
        data, setData,
        selected, selectRows,
        mouseDown, onMouseDown,
        clear
    };
}