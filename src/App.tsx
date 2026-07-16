import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select, LabeledField } from "@/components/ui/Field";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Проверка UI-примитивов</h1>
          <ThemeToggle />
        </div>
        <Card>
          <div className="flex flex-wrap gap-3">
            <Button>Основная</Button>
            <Button variant="ghost">Призрачная</Button>
            <Button variant="danger">Удалить</Button>
          </div>
        </Card>
        <Card className="max-w-md">
          <div className="space-y-4">
            <LabeledField id="demo-input" label="Поле ввода">
              <Input id="demo-input" placeholder="Введите значение" />
            </LabeledField>
            <LabeledField id="demo-select" label="Выпадающий список">
              <Select id="demo-select">
                <option>Первый</option>
                <option>Второй</option>
              </Select>
            </LabeledField>
          </div>
        </Card>
      </div>
    </div>
  );
}
