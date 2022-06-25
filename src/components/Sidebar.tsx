import { gql, useQuery } from "@apollo/client"
import { Lesson } from "./Lesson"

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`

interface Lesson {
  id: string,
  title: string,
  slug: string,
  availableAt: string,
  lessonType: 'live' | 'class'
}

interface GetLessonsQueryResponse{
  lessons: Lesson[]
}

const exampleLesson = {
  id: '1',
  availableAt: new Date(),
  title: 'Aula 1 - O início da especialização em ReactJS',
  slug: 'aula-1',
  lessonType: 'class'
}

export const Sidebar = () => {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)
  console.log(data)

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <ul className="flex flex-col gap-8">
        { data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            availableAt={new Date()}
            title={lesson.title}
            slug={lesson.slug}
            type={lesson.lessonType}
          />
        ))}
      </ul>
    </aside>
  )
}