import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import { WidgetComponent } from "@/types/widget";

interface PropertiesTabProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
}

interface PropertiesItemProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  type: string;
}

function PropertiesItem({
  id,
  label,
  value,
  onChange,
  type,
}: PropertiesItemProps) {
  return (
    <div className="widget-property-item">
      <Input id={id} label={label} value={value} onChange={onChange}></Input>
    </div>
  );
}

export default function PropertiesTab({
  selectedWidget,
  onWidgetUpdate,
}: PropertiesTabProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const onConfigChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newConfig = {
        ...selectedWidget.config,
        [id]: value,
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        config: newConfig,
      });
    };

  return (
    <div>
      <h2>Properties</h2>
      {baseWidget.configs.map((c) => {
        return (
          <PropertiesItem
            id={selectedWidget.id + "-" + c.id}
            key={selectedWidget.id + "-" + c.id}
            label={c.label}
            value={selectedWidget.config[c.id]}
            onChange={onConfigChange(c.id)}
            type={c.type}
          />
        );
      })}
    </div>
  );
}
