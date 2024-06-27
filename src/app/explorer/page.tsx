"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { Button } from "@/components/ui/Button"
import {
  Plus,
  SignIn,
  MagnifyingGlass,
  PushPin,
  Sparkle,
} from "@phosphor-icons/react"
import Robot from "/public/landing/robot.svg"
import { Input } from "@/components/ui/Input"
import { Header } from "@/components/Header"
import { GuildCard } from "@/components/GuildCard"
import useSWR from "swr"
import { GuildBase } from "types"
import { Separator } from "@/components/ui/Separator"
import useIsStuck from "hooks/useIsStuck"
import { PageBoundary } from "@/components/PageBoundary"
import { Card } from "@/components/ui/Card"
import { useEffect, useState } from "react"
import useScrollspy from "hooks/useScrollSpy"

enum ActiveSection {
  YourGuilds = 'your-guilds',
  ExploreGuilds = 'explore-guilds'
}

const Page = () => {
  const { data: guildData } = useSWR<GuildBase[]>(
    "https://api.guild.xyz/v2/guilds?limit=40",
    async (url: string) => (await fetch(url)).json()
  )
  const isAuthenticated = false
  const { ref: navToggleRef, isStuck: navIsStuck } = useIsStuck()
  const { ref: searchRef, isStuck: searchIsStuck } = useIsStuck()
  const [activeSection, setActiveSection] = useState<ActiveSection>(ActiveSection.YourGuilds)
  const spyActiveSection = useScrollspy(Object.values(ActiveSection), 100);
  useEffect(() => {
    if (!spyActiveSection) return
    setActiveSection(spyActiveSection as ActiveSection)
  }, [spyActiveSection])

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 inset-x-0 from-background to-card/30 backdrop-blur border-border border-b bg-gradient-to-b h-28 -translate-y-28 data-[nav-stuck='true']:-translate-y-12 data-[nav-stuck='true']:data-[search-stuck='true']:translate-y-0 motion-safe:transition-transform duration-75" data-nav-stuck={navIsStuck} data-search-stuck={searchIsStuck} />
      <div className="relative">
        <Header />
        <PageBoundary>
          <h1 className="pb-14 pt-9 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl" id={ActiveSection.YourGuilds}>
            Guildhall
          </h1>
        </PageBoundary>
        <div className="absolute inset-0 -bottom-28 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[hsl(240deg_4%_16%)]" />
          <div className="absolute inset-0 bg-[url('/banner.png')] bg-[auto_115%] bg-[right_top_10px] bg-no-repeat opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(240deg_2.65%_22.16%)] from-50% to-transparent" />
        </div>
      </div>
      <PageBoundary>
        <main>
          <div className="sticky top-0 my-1 py-2" ref={navToggleRef}>
            <div className="relative flex items-start justify-between">
              <ToggleGroup type="single" className="space-x-2" size={searchIsStuck ? "sm" : "lg"} variant="mono" onValueChange={(value) => value && setActiveSection(value as ActiveSection)} value={activeSection}>
                <ToggleGroupItem value={ActiveSection.YourGuilds} asChild><a href={`#${ActiveSection.YourGuilds}`}>Your guilds</a></ToggleGroupItem>
                <ToggleGroupItem value={ActiveSection.ExploreGuilds} asChild>
                  <a href={`#${ActiveSection.ExploreGuilds}`}>Explore guilds</a>
                </ToggleGroupItem>
              </ToggleGroup>
              {isAuthenticated && (
                <Button variant="ghost" className="space-x-2">
                  <Plus />
                  <span>Create guild</span>
                </Button>
              )}
            </div>
          </div>
          <section>
            <Card className="my-2 mb-12 flex flex-col items-stretch justify-between gap-8 p-6 font-semibold sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <Robot className="size-8 min-w-8 text-white" />
                <span>Sign in to view your guilds / create new ones</span>
              </div>
              <Button className="space-x-2">
                <SignIn />
                <span className="text-md">Sign in</span>
              </Button>
            </Card>
          </section>
          {isAuthenticated && <Separator className="mb-10" />}
          <h2 className="text-lg font-bold tracking-tight">
            Explore verified guilds
          </h2>
          <div className="sticky top-10" ref={searchRef} id={ActiveSection.ExploreGuilds}>
            <div className="relative flex flex-col gap-3 py-4 sm:flex-row sm:gap-0">
              <Input
                className="text-md relative h-12 grow rounded-xl border pl-12 pr-6 sm:rounded-r-none"
                placeholder="Search verified guilds"
              />
              <div className="absolute left-4 flex h-12 items-center justify-center">
                <MagnifyingGlass className="text-muted-foreground" />
              </div>
              <ToggleGroup
                type="single"
                className="self-start sm:h-12 sm:rounded-r-lg sm:border sm:border-l-0 sm:bg-card sm:px-4"
                defaultValue="featured"
              >
                <ToggleGroupItem value="featured" className="space-x-2" size="sm">
                  <PushPin />
                  <span>featured</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="newest" className="space-x-2" size="sm">
                  <Sparkle />
                  <span>newest</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guildData &&
              guildData.map((data) => (
                <GuildCard key={data.name} guildData={data} />
              ))}
          </div>
        </main>
      </PageBoundary>
    </div>
  )
}

export default Page

// import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
// import ClientOnly from "components/common/ClientOnly"
// import Layout from "components/common/Layout"
// import LinkPreviewHead from "components/common/LinkPreviewHead"
// import ExploreAllGuilds from "components/explorer/ExploreAllGuilds"
// import ExplorerTabs from "components/explorer/ExplorerTabs"
// import GoToCreateGuildButton from "components/explorer/GoToCreateGuildButton"
// import YourGuilds, { useYourGuilds } from "components/explorer/YourGuilds"
// import useScrollRestoration from "components/explorer/hooks/useScrollRestoration"
// import { atom, useAtom } from "jotai"
// import { GetStaticProps } from "next"
// import { useRef } from "react"
// import { GuildBase } from "types"
// import fetcher from "utils/fetcher"
//
// type Props = {
//   guilds: GuildBase[]
// }
//
// export const explorerScrollRestorationAtom = atom(true)
//
// const Page = ({ guilds: guildsInitial }: Props): JSX.Element => {
//   const yourGuildsRef = useRef(null)
//   const allGuildsRef = useRef(null)
//
//   const { data: usersGuilds } = useYourGuilds()
//
//   const bgColor = useColorModeValue("var(--chakra-colors-gray-800)", "#37373a") // dark color is from whiteAlpha.200, but without opacity so it can overlay the banner image
//   const bgOpacity = useColorModeValue(0.06, 0.1)
//   const bgLinearPercentage = useBreakpointValue({ base: "50%", sm: "55%" })
//   const [shouldRestoreScroll, setShouldRestoreScroll] = useAtom(
//     explorerScrollRestorationAtom
//   )
//
//   useScrollRestoration({
//     active: shouldRestoreScroll,
//     onRestore: () => setShouldRestoreScroll(true),
//   })
//
//   return (
//     <>
//       <LinkPreviewHead path="" />
//       <Layout
//         title={"Guildhall"}
//         ogDescription="Automated membership management for the platforms your community already uses."
//         background={bgColor}
//         backgroundProps={{
//           opacity: 1,
//           _before: {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             bg: `linear-gradient(to top right, ${bgColor} ${bgLinearPercentage}, transparent), url('/banner.png ')`,
//             bgSize: { base: "auto 100%", sm: "auto 115%" },
//             bgRepeat: "no-repeat",
//             bgPosition: "top 10px right 0px",
//             opacity: bgOpacity,
//           },
//         }}
//         backgroundOffset={usersGuilds?.length ? 135 : 120}
//         textColor="white"
//       >
//         <ClientOnly>
//           <ExplorerTabs
//             {...{ yourGuildsRef, allGuildsRef }}
//             rightElement={usersGuilds?.length && <GoToCreateGuildButton />}
//           />
//           <YourGuilds ref={yourGuildsRef} />
//         </ClientOnly>
//
//         <ExploreAllGuilds ref={allGuildsRef} {...{ guildsInitial }} />
//       </Layout>
//     </>
//   )
// }
//
// export const getStaticProps: GetStaticProps = async () => {
//   const guilds = await fetcher(`/v2/guilds?sort=members`).catch((_) => [])
//
//   return {
//     props: { guilds },
//     revalidate: 300,
//   }
// }
//
// export default Page
