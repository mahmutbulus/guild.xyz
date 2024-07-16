import { Coins } from "@phosphor-icons/react/Coins"
import { CurrencyCircleDollar } from "@phosphor-icons/react/CurrencyCircleDollar"
import { ImageSquare } from "@phosphor-icons/react/ImageSquare"
import { Link } from "@phosphor-icons/react/Link"
import { ListChecks } from "@phosphor-icons/react/ListChecks"
import { LockOpen } from "@phosphor-icons/react/LockOpen"
import { Parachute } from "@phosphor-icons/react/Parachute"
import { Robot } from "@phosphor-icons/react/Robot"
import { Wallet } from "@phosphor-icons/react/Wallet"
import { Wrench } from "@phosphor-icons/react/Wrench"
import { VISIT_LINK_REGEX } from "requirements/VisitLink/VisitLinkRequirement"
import { emailData } from "rewards/Email/data"
import { formData } from "rewards/Forms/data"
import Star from "static/icons/star.svg"
import GuildLogo from "static/logo.svg"
import { RequirementData } from "./types"

export const REQUIREMENTS_DATA = [
  {
    icon: LockOpen,
    name: "Free",
    types: ["FREE"],
  },
  {
    icon: ImageSquare,
    name: "NFT",
    types: ["ERC721", "ERC1155", "NOUNS"],
    isNegatable: true,
  },
  {
    icon: CurrencyCircleDollar,
    name: "Token",
    types: ["ERC20", "COIN"],
    isNegatable: true,
  },
  {
    icon: ListChecks,
    name: "Allowlist",
    types: ["ALLOWLIST", "ALLOWLIST_EMAIL"],
    isNegatable: true,
  },
  {
    icon: Parachute,
    name: "Airdrop",
    types: ["GUILD_SNAPSHOT"],
    isNegatable: true,
  },
  {
    icon: Coins,
    name: "Payment",
    types: ["PAYMENT"],
  },
  {
    icon: Wrench,
    name: "Contract query",
    types: ["CONTRACT"],
    isNegatable: true,
  },
  {
    icon: Wallet,
    name: "Wallet activity",
    types: [
      "COVALENT_FIRST_TX",
      "COVALENT_FIRST_TX_RELATIVE",
      "COVALENT_CONTRACT_DEPLOY",
      "COVALENT_CONTRACT_DEPLOY_RELATIVE",
      "COVALENT_TX_COUNT",
      "COVALENT_TX_COUNT_RELATIVE",
    ],
    isNegatable: true,
  },
  {
    icon: Robot,
    name: "Captcha",
    types: ["CAPTCHA"],
    isNegatable: true,
  },
  {
    icon: GuildLogo,
    name: "Guild",
    types: [
      "GUILD_ROLE",
      "GUILD_ROLE_RELATIVE",
      "GUILD_MINGUILDS",
      "GUILD_ADMIN",
      "GUILD_USER_SINCE",
      "GUILD_MEMBER",
    ],
    isNegatable: true,
  },
  {
    icon: Star,
    name: "Points",
    types: ["POINTS_AMOUNT", "POINTS_TOTAL_AMOUNT", "POINTS_RANK"],
    isNegatable: true,
  },
  {
    icon: Link,
    name: "Visit link",
    types: ["LINK_VISIT"],
    customNameRules: {
      pattern: {
        value: VISIT_LINK_REGEX,
        message:
          "Your text must contain a link label in square brackets, e.g. [Link Label].",
      },
    },
  },
  {
    icon: emailData.icon,
    name: emailData.name,
    types: ["EMAIL_VERIFIED", "EMAIL_DOMAIN"],
    isNegatable: true,
  },
  {
    icon: formData.icon,
    name: formData.name,
    types: ["FORM_SUBMISSION"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/x.svg",
    name: "X",
    types: [
      "TWITTER_ACCOUNT_AGE",
      "TWITTER_ACCOUNT_AGE_RELATIVE",
      "TWITTER_ACCOUNT_PROTECTED",
      "TWITTER_ACCOUNT_VERIFIED",
      "TWITTER_BIO",
      "TWITTER_FOLLOW",
      "TWITTER_FOLLOWED_BY",
      "TWITTER_FOLLOWER_COUNT",
      "TWITTER_FOLLOWING_COUNT",
      "TWITTER_FOLLOW_V2",
      "TWITTER_LIKE",
      "TWITTER_LIKE_COUNT",
      "TWITTER_LIKE_V2",
      "TWITTER_LIST_MEMBER",
      "TWITTER_NAME",
      "TWITTER_RETWEET",
      "TWITTER_RETWEET_V2",
      "TWITTER_TWEET_COUNT",
    ],
    isPlatform: true,
    isNegatable: true,
  },
  {
    icon: "/platforms/github.png",
    name: "GitHub",
    types: [
      "GITHUB_STARRING",
      "GITHUB_ACCOUNT_AGE",
      "GITHUB_ACCOUNT_AGE_RELATIVE",
      "GITHUB_COMMIT_COUNT",
      "GITHUB_COMMIT_COUNT_RELATIVE",
    ],
    isPlatform: true,
    isNegatable: true,
  },
  {
    icon: "/platforms/discord.png",
    name: "Discord",
    types: [
      "DISCORD_ROLE",
      "DISCORD_JOIN",
      "DISCORD_JOIN_FROM_NOW",
      "DISCORD_MEMBER_SINCE",
    ],
    isPlatform: true,
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/coinbase.png",
    name: "Coinbase",
    types: ["COINBASE_EAS_ATTESTED_BY"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/uniswap.svg",
    name: "Uniswap Liquidity",
    types: ["UNISWAP_V3_POSITIONS"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/polygonId.svg",
    name: "PolygonID",
    types: ["POLYGON_ID_QUERY", "POLYGON_ID_BASIC"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/gitcoin-passport.svg",
    name: "Gitcoin Passport",
    types: ["GITCOIN_PASS", "GITCOIN_STAMP", "GITCOIN_SCORE"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/poap.svg",
    name: "POAP",
    types: ["POAP"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/gitpoap.svg",
    name: "GitPOAP",
    types: ["GITPOAP"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/eas.png",
    name: "EAS",
    types: ["EAS_ATTESTED_BY", "EAS_ATTEST"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/farcaster.png",
    name: "Farcaster",
    types: [
      "FARCASTER_PROFILE",
      "FARCASTER_TOTAL_FOLLOWERS",
      "FARCASTER_FOLLOW",
      "FARCASTER_FOLLOW_CHANNEL",
      "FARCASTER_FOLLOWED_BY",
      "FARCASTER_LIKE",
      "FARCASTER_RECAST",
      "FARCASTER_USERNAME",
      "FARCASTER_BIO",
    ],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/lens.svg",
    name: "Lens",
    types: [
      "LENS_PROFILE",
      "LENS_FOLLOW",
      "LENS_REACT",
      "LENS_COLLECT",
      "LENS_ACTION",
      "LENS_TOTAL_FOLLOWERS",
      "LENS_TOTAL_POSTS",
      "LENS_FOLLOWED_BY",
    ],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/web3inbox.png",
    name: "Web3Inbox",
    types: ["WEB3INBOX_SUBSCRIBERS"],
  },
  {
    icon: "/requirementLogos/galaxy.svg",
    name: "Galxe",
    types: ["GALAXY", "GALAXY_PARTICIPATION"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/snapshot.png",
    name: "Snapshot",
    types: [
      "SNAPSHOT_STRATEGY",
      "SNAPSHOT_SPACE_ADMIN",
      "SNAPSHOT_SPACE_AUTHOR",
      "SNAPSHOT_FOLLOW",
      "SNAPSHOT_FOLLOW_SINCE",
      "SNAPSHOT_USER_SINCE",
      "SNAPSHOT_VOTES",
      "SNAPSHOT_PROPOSALS",
      "SNAPSHOT_MAJORITY_VOTES",
    ],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/mirror.svg",
    name: "Mirror",
    types: ["MIRROR_COLLECT"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/sound.png",
    name: "Sound",
    types: [
      "SOUND_ARTIST_BACKED",
      "SOUND_COLLECTED",
      "SOUND_ARTIST",
      "SOUND_TOP_COLLECTOR",
      "SOUND_NFTS",
    ],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/disco.png",
    name: "Disco",

    types: ["DISCO"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/unlock.png",
    name: "Unlock",
    types: ["UNLOCK"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/juicebox.png",
    name: "Juicebox",
    types: ["JUICEBOX"],
    isNegatable: true,
  },
  {
    icon: "/walletLogos/fuel.svg",
    name: "Fuel",
    types: ["FUEL_BALANCE", "FUEL_TRANSACTIONS"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/noox.svg",
    name: "Noox",
    types: ["NOOX"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/yup.svg",
    name: "Yup",
    types: ["YUP"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/rep3.png",
    name: "Rep3",
    types: ["REP3"],
    isNegatable: true,
  },
  {
    icon: "/requirementLogos/parallel.png",
    name: "Parallel",
    types: ["PARALLEL_ID", "PARALLEL_SANCTIONS_SAFE", "PARALLEL_TRAIT"],
    isNegatable: true,
  },
] as const satisfies RequirementData[]

export default REQUIREMENTS_DATA
