import { FileCode2 } from "lucide-react";

interface WindowChromeProps {
  file: string;
  title: string;
  right?: string;
}

export default function WindowChrome({ file, title, right }: WindowChromeProps) {
  return (
    <div className="win-chrome">
      <div className="win-dots">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
      </div>
      <div className="win-tab">
        <FileCode2 size={13} />
        <span>{file}</span>
      </div>
      <div className="win-title">{title}</div>
      <div className="win-right">{right}</div>
    </div>
  );
}
