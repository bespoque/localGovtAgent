export default function TextEllipsis(width?: string | number, more?: React.CSSProperties): React.CSSProperties {
    return {
        width: width ? width : "100px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block",
        ...more
    }
}