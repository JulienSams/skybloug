import './SkyblogLayout.css';

interface SkyblogLayoutProps {
  leftSidebar: React.ReactNode;
  content: React.ReactNode;
  rightSidebar: React.ReactNode;
}

export function SkyblogLayout({ leftSidebar, content, rightSidebar }: SkyblogLayoutProps) {
  return (
    <div className="skyblog-layout">
      <div className="skyblog-sidebar-left">{leftSidebar}</div>
      <div className="skyblog-content">{content}</div>
      <div className="skyblog-sidebar-right">{rightSidebar}</div>
    </div>
  );
}
