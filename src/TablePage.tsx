import { FixedSizeList as List } from "react-window";
import "./App.css";

export default function TablePage() {
  const data: any[] = []; // per ora vuota

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const s = data[index];
    return (
      <div style={style} className="row">
        <div>{s?.name ?? "-"}</div>
        <div>{s?.temp != null ? `${s.temp} °C` : "-"}</div>
        <div>{s?.hum != null ? `${s.hum} %` : "-"}</div>
        <div>{s?.timestamp ?? "-"}</div>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tabella stazioni meteo</h1>
      <p>Ancora vuota</p>

      <List height={400} itemCount={data.length} itemSize={40} width={"100%"}>
        {Row}
      </List>
    </div>
  );
}
