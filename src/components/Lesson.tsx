import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom'

interface LessonProps{
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export const Lesson = ({availableAt, slug, title, type}: LessonProps) => {
  const isLessonAvailable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  return (
    <li>
      <p className="text-gray-300 capitalize">
        {availableDateFormatted}
      </p>

      <Link to={`/event/lesson/${slug}`}>
      <div className="rounded border border-gray-500 p-4 mt-2 hover:border-green-700 transition-colors">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <p className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20}/>
              Conteúdo liberado
            </p>
          ) : (
            <p className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20}/>
              Em breve
            </p>
          )}
          <p className="text-xs rounded px-2 py-[2px] text-white border border-green-300">
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </p>
        </header>

        <strong className="text-gray-200 mt-5 block">
          {title}
        </strong>
      </div>
      </Link>
    </li>
  )
}