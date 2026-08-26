import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { calendarEvents } from '@/data';

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const categoryColors: Record<string, string> = {
  'Pesquisa': 'bg-violet-500',
  'Avaliação': 'bg-blue-500',
  'Comunicação': 'bg-pink-500',
  'GG': 'bg-emerald-500',
  'Treinamento': 'bg-amber-500',
  'Desenvolvimento': 'bg-orange-500',
  'Prazo': 'bg-red-500',
};

export function Calendario() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);
    return arr;
  }, [firstDay, daysInMonth]);

  function getEventsForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(ev => {
      const start = ev.date;
      const end = ev.endDate || ev.date;
      return dateStr >= start && dateStr <= end;
    });
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const selectedEventData = selectedEvent ? calendarEvents.find(e => e.id === selectedEvent) : null;

  // Upcoming events
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const upcoming = calendarEvents
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="page-container">
      <PageHeader
        title="Calendário"
        subtitle="Eventos, prazos e datas importantes do GG."
        breadcrumbs={[{ label: 'Calendário' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card-base p-5">
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-planning-gray-100 transition-colors">
              <ChevronLeft size={18} className="text-planning-gray-500" />
            </button>
            <h2 className="text-base font-semibold text-planning-gray-800">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-planning-gray-100 transition-colors">
              <ChevronRight size={18} className="text-planning-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-planning-gray-100 rounded-xl overflow-hidden">
            {DAY_NAMES.map(d => (
              <div key={d} className="bg-planning-gray-50 text-center py-2 text-[11px] font-semibold text-planning-gray-400 uppercase">
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="bg-white min-h-[70px]" />;
              const events = getEventsForDay(day);
              const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              return (
                <div key={day} className={`bg-white min-h-[70px] p-1.5 ${isToday ? 'ring-2 ring-inset ring-planning-green/30' : ''}`}>
                  <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full
                    ${isToday ? 'bg-planning-green text-white' : 'text-planning-gray-600'}`}>
                    {day}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {events.slice(0, 2).map(ev => (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEvent(selectedEvent === ev.id ? null : ev.id)}
                        className={`w-full text-left px-1 py-0.5 rounded text-[9px] font-medium text-white truncate
                          ${categoryColors[ev.category] || 'bg-planning-gray-400'}
                          hover:opacity-80 transition-opacity`}
                      >
                        {ev.title}
                      </button>
                    ))}
                    {events.length > 2 && (
                      <span className="text-[9px] text-planning-gray-400 pl-1">+{events.length - 2}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Event detail */}
          {selectedEventData && (
            <div className="card-base p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${categoryColors[selectedEventData.category] || 'bg-gray-400'}`} />
                <span className="badge-gray text-[10px]">{selectedEventData.category}</span>
              </div>
              <h3 className="text-sm font-semibold text-planning-gray-800 mb-2">{selectedEventData.title}</h3>
              <p className="text-xs text-planning-gray-500 mb-3">{selectedEventData.description}</p>
              <div className="text-xs text-planning-gray-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  <span>{new Date(selectedEventData.date).toLocaleDateString('pt-BR')}</span>
                  {selectedEventData.endDate && <span>— {new Date(selectedEventData.endDate).toLocaleDateString('pt-BR')}</span>}
                </div>
                {selectedEventData.recurring && <span className="badge-green text-[10px]">Recorrente</span>}
              </div>
            </div>
          )}

          {/* Upcoming */}
          <div className="card-base p-5">
            <h3 className="text-sm font-semibold text-planning-gray-800 mb-3">Próximos Eventos</h3>
            {upcoming.length === 0 ? (
              <p className="text-xs text-planning-gray-400">Nenhum evento próximo.</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => { setSelectedEvent(ev.id); const d = new Date(ev.date); setMonth(d.getMonth()); setYear(d.getFullYear()); }}
                    className="w-full flex items-start gap-2.5 text-left group"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${categoryColors[ev.category] || 'bg-gray-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-planning-gray-700 group-hover:text-planning-green transition-colors truncate">{ev.title}</p>
                      <p className="text-[11px] text-planning-gray-400">{new Date(ev.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="card-base p-5">
            <h3 className="text-sm font-semibold text-planning-gray-800 mb-3">Legenda</h3>
            <div className="space-y-2">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-xs text-planning-gray-600">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
