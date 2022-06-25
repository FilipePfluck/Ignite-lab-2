import { gql, useQuery } from "@apollo/client"
import { DefaultUi, Player, Youtube } from "@vime/react"
import { DiscordLogo, FileArrowDown, Lightning, Image } from "phosphor-react"
import { ExternalContentButton } from "./ExternalContentButton"
import { LinkButton } from "./LinkButton"

import '@vime/core/themes/default.css'

const GET_LESSON_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`

interface GetLessonQueryResponse {
  lesson: {
    title: string
    videoId: string
    description: string
    teacher: {
      bio: string
      avatarURL: string
      name: string
    }
  }
}

interface VideoProps {
  slug: string
}

export const Video = ({slug}: VideoProps) => {
  const {data} = useQuery<GetLessonQueryResponse>(GET_LESSON_QUERY, {
    variables: {
      slug
    }
  })

  if(!data) return (
    <div className="flex-1 h-[1000px]">

    </div>
  )

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi/>
          </Player>
        </div>
      </div>

      <div className="p-8 max-width-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img 
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt={data.lesson.teacher.name} 
              />

              <div className="leading-reladex">
                <strong className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </strong>
                <p className="text-gray-200 test-sm block">
                  {data.lesson.teacher.bio}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <LinkButton variant="primary">
              <DiscordLogo size={24}/>
              Comunidade do Discord
            </LinkButton>

            <LinkButton variant="secondary">
              <Lightning size={24}/>
              Acesse o desafio
            </LinkButton>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <ExternalContentButton
            icon={<FileArrowDown size={40}/>}
            title="Material complementar"
            description="Acesse o material complementar para acelerar o seu desenvolvimento"
          />
          <ExternalContentButton
            icon={<Image size={40}/>}
            title="Wallpapers exclusivos"
            description="Baixe wallpapers exclusivos do Ignite Lab e personalize sua máquina"
          />
        </div>
      </div>
    </div>
  )
}