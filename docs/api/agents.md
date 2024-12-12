---
sidebar_position: 2
sidebar_label: For Agents & LLMs
---

# Docs for Agents & LLMs

:::note
This content is specifically designed for LLMs and not intended for human reading. Copy the large schema below and paste it into your AI assistant. Then, ask your assistant to construct queries on your behalf, asking it for certain onchain information. Generated queries can be tested via the API [Sandbox](/docs/api/sandbox).
:::

For programmatic access, you can fetch this content directly:

```js
curl protocol.zapper.xyz/agents
```

```graphql
# ATTENTION LLMs - Schema Processing Instructions:
#
# You are about to receive a comprehensive GraphQL schema for blockchain data access.
# This schema includes interfaces, types, and example queries for accessing:
# - Portfolio data (Tokens, App Positions, NFTs)
# - Onchain Token Prices (Current and Historical)
# - Account primitives such as ENS, Farcaster, and Lens.
# - Onchain transaction histories for addresses and apps.
# - Network information
#
# The schema is extensive and includes many nested types. When processing:
# 1. Index the full schema for future reference
# 2. Note required (!) vs optional fields
# 3. Pay attention to enum values, especially Network types
# 4. Understand the relationships between types
# 5. Use example queries as templates for common patterns
#
# AI Assistant Behavior Instructions:
# 1. Always validate network inputs against the Network enum
# 2. Generate production-ready code that exactly matches requirements
# 3. Implement proper error handling for failed queries
# 4. Parse responses correctly and validate all inputs
# 5. Use the simplest query possible - avoid nesting unnecessarily
# 6. Never use placeholder addresses - require real addresses
# 7. Follow proper query structure and syntax
# 8. Write reusable, well-structured queries
# 9. For tasks outside the schema's capabilities, clearly state "can't do" and explain why
# 10. Consider rate limits and query complexity - avoid excessive nesting
# 11. Only use queries that are available in the schema below
#
# IMPORTANT FOR CREATING QUERY DO NOT IGNORE
# 1. First look at the Query type in the schema
# 2. Find the appropriate query for the task (ex: nftUsersTokens)
# 3. Use that exact query name from the schema
# 4. Double check that the output query matches a real query from the schema and has the required parameters and return types

interface AbstractAppView {
  label: String!
  type: AppViewType!
  positionType: String
}

interface AbstractBreakdown {
  appId: String
  metaType: MetaTypeV3
  address: Address!
  network: Network!
  balanceUSD: Float!
  type: BreakdownType!
  breakdown: [AbstractBreakdown!]!
}

interface AbstractDisplayItem {
  type: String!
}

interface AbstractMetadataItem {
  type: String!
}

interface AbstractPosition {
  appId: String!
  type: ContractType!
  network: Network!
}

interface AbstractPositionBalance {
  type: String!
  key: String
  address: String!
  network: Network!
  appId: String!
  groupId: String!
  groupLabel: String
  displayProps: DisplayProps
}

interface AbstractToken {
  type: String!
  address: String!
  network: Network!
  balance: String!
  balanceUSD: Float!
  price: Float!
  symbol: String!
  decimals: Float!
}

type Account implements Node {
  id: ID!
  address: Address!
  displayName: DisplayName!
  avatar(opepenSize: AllowedOpepenSizes! = XS): AccountAvatar!
  description: Description
  socialLinks: [AccountSocialLink!]!
  ens: String @deprecated(reason: "Use ensRecord instead")
  contract: Contract
  metadata: [AddressMetadataObject!]!
  isContract: Boolean!
  nftAvatar: NftAvatar @deprecated(reason: "Use avatar instead")
  opepenURI: String!
  blockiesURI: String!
  isFollowedBy(address: Address!): Boolean!
  followStats: FollowerStats
  followers(first: Int, after: String): FollowerConnection!
  following(first: Int, after: String): FollowerConnection!
  ensRecord: EnsRecord
  lensProfile: LensProfile
  farcasterProfile: FarcasterProfile
  label: String
}

type AccountAvatar {
  value: Avatar!
  source: AccountAvatarSource!
}

enum AccountAvatarSource {
  ZAPPER
  ENS
  LENS
  FARCASTER
  OPEPENS
  BLOCKIES
}

enum AccountDescriptionSource {
  ENS
  LENS
  FARCASTER
}

enum AccountDisplayNameSource {
  ENS
  LENS
  FARCASTER
  LABEL
  ADDRESS
}

type AccountEdge {
  node: Account!
  cursor: String!
}

type AccountSocialLink {
  url: String!
  name: AccountSocialLinkName!
  source: AccountSocialLinkSource!
}

enum AccountSocialLinkName {
  WEBSITE
  TWITTER
  GITHUB
  EMAIL
  HEY
  WARPCAST
}

enum AccountSocialLinkSource {
  ENS
  LENS
  FARCASTER
}

type ActivityAccountDelta implements Node {
  id: ID!
  tokenDeltasCount: Int!
  nftDeltasCount: Int!
  account: Account
  tokenDeltasV2(first: Int = 5, after: String): FungibleTokenDeltaConnection!
  nftDeltasV2(first: Int = 5, after: String): NftDeltaConnection!
}

type ActivityAccountDeltaConnection {
  edges: [ActivityAccountDeltaEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type ActivityAccountDeltaEdge {
  node: ActivityAccountDelta!
  cursor: String!
}

type ActivityEvent {
  key: String!
  network: Network!
  source: String!
  eventType: String!
  isAbiAvailable: Boolean!
  isEditable: Boolean!
  interpreterId: String
  interpreter: ActivityEventInterpreter
  actors: [ActorDisplayItem!]
  timestamp: Timestamp!
  perspective: ActivityPerspective!
  interpretation: ActivityInterpretation!
  transaction: OnChainTransaction
  similarEventCount: Int
  app: ActivityFeedApp
  accountDeltasV2(first: Int = 6, after: String): ActivityAccountDeltaConnection!
  perspectiveDelta: ActivityAccountDelta
  sigHash: String
}

type ActivityEventConnection {
  edges: [ActivityEventEdge!]!
  pageInfo: PageInfo!
}

type ActivityEventEdge {
  node: ActivityEvent!
  cursor: String!
}

type ActivityEventInterpreter {
  id: String!
  priority: Int!
  category: ActivityEventTopic!
  app: ActivityFeedApp
  isCodeless: Boolean!
}

enum ActivityEventTopic {
  Defi
  Swaps
  NftMints
  NftSales
  NftFi
  NftBidding
  Social
  Bridge
  Gaming
  Governance
  Fundraising
  Art
  Metaverse
  None
  Nft
  All
  Unknown
}

type ActivityFeedApp {
  slug: String!
  name: String!
  url: String
  tags: [String!]!
  imgUrl: String!
  imageUrl: String! @deprecated(reason: "Use imgUrl instead")
  description: String!
  app: App!
}

union ActivityFeedDisplayItem =
  | ActorDisplayItem
  | AppDisplayItem
  | AppContractNetworkDisplayItem
  | ChatChannelDisplayItem
  | CompositeDisplayItem
  | ImageDisplayItem
  | NetworkDisplayItem
  | NFTCollectionDisplayItem
  | NFTDisplayItem
  | NumberDisplayItem
  | ProposalDisplayItemObject
  | StringDisplayItem
  | TokenContractDisplayItem
  | TokenDisplayItem
  | TransactionDisplayItem

type ActivityFeedDisplayItemEdge {
  node: ActivityFeedDisplayItem!
  cursor: String!
}

union ActivityFeedLeafDisplayItem =
  | ActorDisplayItem
  | AppDisplayItem
  | AppContractNetworkDisplayItem
  | ChatChannelDisplayItem
  | ImageDisplayItem
  | NetworkDisplayItem
  | NFTCollectionDisplayItem
  | NFTDisplayItem
  | NumberDisplayItem
  | ProposalDisplayItemObject
  | StringDisplayItem
  | TokenContractDisplayItem
  | TokenDisplayItem
  | TransactionDisplayItem

type ActivityInterpretation {
  description: String!
  descriptionDisplayItems: [ActivityFeedDisplayItem!]!
  inboundAttachments: [ActivityFeedDisplayItem!]!
  outboundAttachments: [ActivityFeedDisplayItem!]!
  inboundAttachmentsConnection(first: Int, after: String): AttachmentConnection!
  outboundAttachmentsConnection(first: Int, after: String): AttachmentConnection!
  processedDescription: String!
}

type ActivityPerspective {
  type: String!
  value: String!
}

union Actor = User | Wallet | Contract

type ActorDisplayItem {
  type: String!
  address: Address!
  actor: Actor! @deprecated(reason: "Use `account` instead")
  actorV2: ActorV2! @deprecated(reason: "Use `account` instead")
  account: Account!
}

union ActorV2 = Account | Contract

"""
Address
"""
scalar Address

type AddressMetadataEdge {
  node: AddressMetadataObject!
  cursor: String!
}

type AddressMetadataObject implements Node {
  id: ID!
  address: Address!
  network: String
  relatedEntityTypes: [OnchainEntityType!]!
  label: String!
  labelSource: String!
  updatedAt: Timestamp!
  createdAt: Timestamp!
}

enum AllowedOpepenSizes {
  XXS
  XS
  S
  M
  L
  XL
}

type Animation {
  """
  File size in bytes. Return `null` if unknown.
  """
  fileSize: Int

  """
  File mime type from https://www.iana.org/assignments/media-types/media-types.xhtml
  """
  mimeType: String
  url: String! @deprecated(reason: "Use `original` instead.")

  """
  Returns a link of the original animation
  """
  original: String!
}

type AnimationConnection {
  edges: [AnimationEdge!]!
  pageInfo: PageInfo!
}

type AnimationEdge {
  node: Animation!
  cursor: String!
}

type App implements Node {
  id: ID!

  """
  Unique application ID
  """
  databaseId: Int!

  """
  Unique application slug
  """
  slug: String!

  """
  Is this application deprecated?
  """
  deprecated: Boolean!

  """
  Group in which this application belongs to
  """
  groups: [String!]! @deprecated(reason: "Prefer using groupDefinition")

  """
  Group in which this application belongs to
  """
  groupDefinitions: [AppGroupDefinition!]!

  """
  The typical display name of the application
  """
  displayName: String!

  """
  Application website
  """
  url: String

  """
  Application links
  """
  links: AppLinks
  websiteUrl: String @deprecated(reason: "Renamed to url")

  """
  Description of the application.
  """
  description: String!
  label: String
  imgUrl: String!
  tags: [ApplicationTag!]!
  appTokenPositions: [AppTokenPosition!]!
  contractPositions: [AppContractPosition!]!
  positions: [AppPositionGroup!]!
  tvl: [AppTvl!]!
  tabs: [AbstractAppView!]!
  tokenAddress: String
  tokenNetwork: Network
  token: BaseTokenPosition
  categoryId: Int
  category: AppCategoryObject
  twitterUrl: String
  farcasterUrl: String
}

type AppBalance {
  key: String!
  address: String!
  appId: String!
  appName: String!
  appImage: String!
  network: Network!
  updatedAt: Timestamp!
  balanceUSD: Float!
  products: [ProductItem!]!
}

type AppCategoryObject {
  id: ID!
  name: String!
  slug: String!
  description: String!
  trendable: Boolean!
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type AppContractNetworkDisplayItem {
  type: String!
  address: String!
  network: Network!
  app: ActivityFeedApp
}

type AppContractPosition {
  key: String!
  address: String!
  appId: String!
  appName: String!
  groupId: String!
  type: ContractType!
  label: String!
  liquidity: Float
  groupLabel: String! @deprecated(reason: "prefer using label")
  network: Network!
  displayProps: PositionBreakdownDisplayProps!
  tokens: [AbstractPosition!]!
  baseTokensSymbols: [String!]!
  baseTokens: [BaseTokenPosition!]!
}

type AppDisplayItem {
  type: String!
  id: ID!
  appId: String! @deprecated(reason: "Use app.slug instead")
  network: Network!
  app: ActivityFeedApp
}

type AppDropdownView implements AbstractAppView {
  label: String!
  type: AppViewType!
  positionType: String
  options: [AbstractAppView!]!
  groupIds: [String!]
}

type AppEdge {
  node: App!
  cursor: String!
}

type AppFungibleToken {
  address: Address!
  network: Network!
  price: BigDecimal
  symbol: String!
  decimals: Float!
  label: String!
  imageUrls: [String!]!
  appImageUrl: String!
  isDebt: Boolean!
}

type AppGroupDefinition {
  id: String!
  label: String!
  groupLabel: String @deprecated(reason: "should no longer be used")
  isHiddenFromExplore: Boolean
  type: String!
}

type AppInvestment {
  investment: Investment!
}

type AppInvestmentConnection {
  edges: [AppInvestmentEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type AppInvestmentEdge {
  node: AppInvestment!
  cursor: String!
}

enum ApplicationTag {
  ALGORITHMIC_STABLECOIN
  ASSET_MANAGEMENT
  BONDS
  BRIDGE
  COLLATERALIZED_DEBT_POSITION
  CROSS_CHAIN
  DECENTRALIZED_EXCHANGE
  DERIVATIVES
  ELASTIC_FINANCE
  FARMING
  FUND_MANAGER
  GAMING
  INFRASTRUCTURE
  INSURANCE
  LAUNCHPAD
  LENDING
  LIQUIDITY_POOL
  LIQUID_STAKING
  LOTTERY
  MARGIN_TRADING
  NFT_LENDING
  NFT_MARKETPLACE
  OPTIONS
  PAYMENTS
  PERPETUALS_EXCHANGE
  PREDICTION_MARKET
  PRIVACY
  REAL_ESTATE
  RESERVE_CURRENCY
  STABLECOIN
  STAKING
  SYNTHETICS
  TOKENIZED_RISK
  YIELD_AGGREGATOR
  LIMIT_ORDER
}

type AppLinks {
  """
  Discord channel link
  """
  discord: String

  """
  GitHub organization link
  """
  github: String

  """
  Medium blog link
  """
  medium: String

  """
  Telegram channel link
  """
  telegram: String

  """
  Twitter profile link
  """
  twitter: String
}

type AppListView implements AbstractAppView {
  label: String!
  type: AppViewType!
  positionType: String
  positions: AppPositionGroup!
  totalPositions: Float!
  groupIds: [String!]
}

type AppPositionGroup {
  label: String!
  groupLabel: String! @deprecated(reason: "prefer using label")
  appTokenPositions: [AppTokenPosition!]! @deprecated(reason: "prefer using investments")
  contractPositions: [AppContractPosition!]! @deprecated(reason: "prefer using investments")
  investments: AppInvestmentConnection!
  baseTokenSymbols: [String!]!
  baseTokens: [BaseTokenPosition!]!
}

type AppSplitView implements AbstractAppView {
  label: String!
  type: AppViewType!
  positionType: String
  views: [AbstractAppView!]!
  groupIds: [String!]
}

type AppTokenPosition implements AbstractPosition {
  appId: String! @deprecated(reason: "use app.slug instead")
  type: ContractType!
  network: Network!
  appName: String! @deprecated(reason: "use app.name instead")
  decimals: Int!
  metaType: String
  groupId: String!
  label: String
  liquidity: Float
  groupLabel: String @deprecated(reason: "prefer using label")
  price: Float!
  pricePerShare: [Float!]!
  supply: String!
  symbol: String!
  address: String!
  name: String
  tokens: [AbstractPosition!]!
  displayProps: PositionBreakdownDisplayProps!
  baseTokensSymbols: [String!]!
  baseTokens: [BaseTokenPosition!]!
}

type AppTokenPositionBalance implements AbstractToken & AbstractPositionBalance {
  type: String!
  address: String!
  network: Network!
  balance: String!
  balanceUSD: Float!
  price: Float!
  symbol: String!
  decimals: Float!
  key: String
  appId: String!
  groupId: String!
  groupLabel: String
  displayProps: DisplayProps
  supply: Float!
  pricePerShare: [Float!]!
  tokens: [AbstractToken!]!
  hasMissingUnderlyingTokenPrice: Boolean!
}

type AppTokenPositionEdge {
  node: AppTokenPosition!
  cursor: String!
}

type AppTvl {
  """
  Associated network of the app
  """
  network: Network!

  """
  Total value locked of an app for a given network
  """
  tvl: Float!
}

enum AppViewType {
  list
  split
  dropdown
}

type AttachmentConnection {
  edges: [ActivityFeedDisplayItemEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
  nftCount: Int!
}

type Audio {
  original: String!

  """
  File size in bytes. Return `null` if unknown.
  """
  fileSize: Int

  """
  File mime type from https://www.iana.org/assignments/media-types/media-types.xhtml
  """
  mimeType: String
}

type AudioConnection {
  edges: [AudioEdge!]!
  pageInfo: PageInfo!
}

type AudioEdge {
  node: Audio!
  cursor: String!
}

union Avatar = NftToken | NftTokenErc721 | NftTokenErc1155 | NftAvatar | AvatarUrl

type AvatarUrl {
  url: String!
  mimeType: String
}

type Badge {
  tokenId: Int!
  badgeName: String!
  claimed: Boolean!
  badgeNetwork: Network!
  userAddress: Address!
}

enum BalanceDisplayMode {
  DEFAULT
  UNDERLYING
}

type BaseFungibleToken {
  address: Address!
  network: Network!
  price: BigDecimal
  symbol: String!
  decimals: Float!
  imageUrl: String
}

type BaseTokenBalance {
  baseToken: WalletTokenBalanceToken!
  balance: Float!
  balanceUSD: Float!
  balanceRaw: String!
}

type BaseTokenPosition implements AbstractPosition {
  appId: String!
  type: ContractType!
  network: Network!
  metaType: String
  address: String!
  symbol: String!
  price: Float!
  decimals: Int!
  status: String
  hide: Boolean
  canExchange: Boolean
}

type BaseTokenPositionBalance implements AbstractToken {
  type: String!
  address: String!
  network: Network!
  balance: String!
  balanceUSD: Float!
  price: Float!
  symbol: String!
  decimals: Float!
  priceSource: Erc20TokenPriceSource
}

"""
Big decimal scalar
"""
scalar BigDecimal

enum BreakdownType {
  POSITION
  TOKEN
  NON_FUNGIBLE_TOKEN
}

input ByAddressInput {
  address: Address!
}

type ChatChannel implements Node {
  id: ID!
  network: Network!
  name: String!
  description: String!
  createdAt: Timestamp!
  imageUrl: String!
  totalShares: Int!
  valuePerShare: String!
  channelFeePerShare: String!
  protocolFeePerShare: String!
}

type ChatChannelDisplayItem {
  type: String!
  channelId: String!
}

type ChatChannelEdge {
  node: ChatChannel!
  cursor: String!
}

type ChatChannelMember implements Node {
  id: ID!
  address: String!
  shares: Int!
}

type ChatChannelMemberEdge {
  node: ChatChannelMember!
  cursor: String!
}

type ChatMessage implements Node {
  id: ID!
  channelId: ID!
  fromAddress: String!
  createdAt: Timestamp!
  isConsecutive: Boolean!
  content: ChatMessageContent!
}

union ChatMessageContent =
  | ChatMessageTextContent
  | ChatMessageNewMemberContent
  | ChatMessageGifContent
  | ChatMessageReplyContent

type ChatMessageEdge {
  node: ChatMessage!
  cursor: String!
}

type ChatMessageGifContent {
  type: String!
  giphyId: String!
}

type ChatMessageNewMemberContent {
  type: String!
  initialShares: Int!
}

type ChatMessageReplyContent {
  type: String!
  text: String!
}

type ChatMessageTextContent {
  type: String!
  text: String!
}

type ClaimableToken {
  appId: String!
  address: String!
  token: AbstractToken!
}

type CoinGeckoMarketData implements MarketData {
  type: MarketDataType!
  isExchangeable: Boolean!
  price(currency: Currency = USD): Float
  coinGeckoId: String!
  coinGeckoUrl: String!
  totalSupply: String
  dailyVolume: Float
  marketCap: Float
}

interface CollectionEvent implements Node {
  id: ID!
  timestamp: Int!
  txHash: String!
  intention: String
  event: CollectionEventOld! @deprecated(reason: "Use `CollectionEvent` instead")
}

type CollectionEventConnection {
  edges: [CollectionEventEdge!]!
  pageInfo: PageInfo!
}

input CollectionEventConnectionInput {
  first: Int = 25

  """
  Cursor of an edge (excluded)
  """
  after: String

  """
  Cursor of an edge (excluded) to move backwards
  """
  before: String
  search: String
  tokenIds: [String!]
  owners: [Address!]
  followedBy: Address
  traits: [NftTokenTraitInput!]
  period: NftPaymentStatsPeriod
}

type CollectionEventEdge {
  node: CollectionEvent!
  cursor: String!
}

union CollectionEventOld = EventSale | EventTransfer

type CollectionEventSale implements CollectionEvent & Node {
  id: ID!
  timestamp: Int!
  txHash: String!
  intention: String
  event: CollectionEventOld! @deprecated(reason: "Use `CollectionEvent` instead")
  payments: [NftPayment!]!
}

type CollectionEventTransfer implements CollectionEvent & Node {
  id: ID!
  timestamp: Int!
  txHash: String!
  intention: String
  event: CollectionEventOld! @deprecated(reason: "Use `CollectionEvent` instead")
}

type CompositeDisplayItem {
  type: String!
  itemCount: Int!
  items(first: Int = 1000): [ActivityFeedLeafDisplayItem!]!
}

type Contract {
  address: Address!
  network: Network!
}

type ContractPositionBalance implements AbstractPositionBalance {
  type: String!
  key: String
  address: String!
  network: Network!
  appId: String!
  groupId: String!
  groupLabel: String
  displayProps: DisplayProps
  balanceUSD: Float!
  tokens: [TokenWithMetaType!]!
}

enum ContractType {
  POSITION
  BASE_TOKEN
  APP_TOKEN
  NON_FUNGIBLE_TOKEN
}

enum Currency {
  USD
  EUR
  GBP
  CAD
  CNY
  KRW
  JPY
  RUB
  AUD
  NZD
  CHF
  SGD
  INR
  BRL
  ETH
  BTC
  HKD
  SEK
  NOK
  MXN
  TRY
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type DecodedInput {
  signature: String!
  data: [String!]!
}

type DecodedInputDataValue {
  name: String!
  value: String!
}

type DecodedInputV2 {
  signature: String!
  data: [DecodedInputDataValue!]!
}

type Description {
  value: String!
  source: AccountDescriptionSource!
}

type DisplayItemDollar implements AbstractDisplayItem {
  type: String!
  valueDollar: Float!
}

type DisplayItemNumber implements AbstractDisplayItem {
  type: String!
  valueNumber: Float!
}

type DisplayItemPercentage implements AbstractDisplayItem {
  type: String!
  valuePct: Float!
}

type DisplayItemString implements AbstractDisplayItem {
  type: String!
  valueString: String!
}

type DisplayItemTranslation implements AbstractDisplayItem {
  type: String!
  valueTranslation: String!
}

type DisplayItemWrapper {
  label: AbstractDisplayItem!
  value: AbstractDisplayItem!
}

type DisplayName {
  value: String!
  source: AccountDisplayNameSource!
}

type DisplayProps {
  label: String!
  secondaryLabel: AbstractDisplayItem
  tertiaryLabel: AbstractDisplayItem
  images: [String!]!
  statsItems: [StatsItem!]
  balanceDisplayMode: BalanceDisplayMode
}

type DollarMetadataItem implements AbstractMetadataItem {
  type: String!
  valueDollar: Float!
}

"""
Ethereum Name Service
"""
scalar Ens

union EnsAvatar = NftToken | NftTokenErc721 | NftTokenErc1155 | AvatarUrl

type EnsMetadata {
  avatar: EnsAvatar
  description: String
  github: String
  twitter: String
  email: String
  website: String
}

type EnsRecord {
  name: Ens!
  metadata: EnsMetadata!
}

enum Erc20TokenPriceSource {
  ORACLE
  COINGECKO
  OCP_V1
  OCP_V2
  NONE
}

type EventSale {
  timestamp: Int!
  txHash: String!
  payments: [NftPayment!]!
}

type EventTransfer {
  timestamp: Int!
  txHash: String!
}

type FarcasterFollowerConnection {
  edges: [FarcasterProfileEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type FarcasterFollowerStats {
  followerCount: Int!
  followingCount: Int!
}

type FarcasterMetadata {
  displayName: String
  description: String
  warpcast: String
  imageUrl: String
}

type FarcasterProfile implements Node {
  id: ID!
  username: String!
  custodyAddress: String!
  fid: Int!
  connectedAddresses: [String!]!
  metadata: FarcasterMetadata!
  zapperBotSubscribedAddresses: [Address!]!
  followStats: FarcasterFollowerStats
  followers(first: Int, after: String): FarcasterFollowerConnection!
  following(first: Int, after: String): FarcasterFollowerConnection!
}

type FarcasterProfileEdge {
  node: FarcasterProfile!
  cursor: String!
}

type FiniliarPortfolioChange {
  changePercentage: Float!
  oldestSnapshot: FiniliarPortfolioSnapshot!
  latestSnapshot: FiniliarPortfolioSnapshot!
}

type FiniliarPortfolioSnapshot {
  totalUsd: Float!
  timestamp: Timestamp!
}

type FollowerConnection {
  edges: [AccountEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type FollowerStats {
  followerCount: Int!
  followingCount: Int!
}

type FungibleToken implements Node {
  id: ID!
  address: Address!
  name: String!
  symbol: String!
  decimals: Int!
  totalSupply: String
  networkId: Int!
  marketData: MarketData @deprecated(reason: "Use onchainMarketData for EVM tokens")
  credibility: Float
  rank: Int
  securityRisk: FungibleTokenSecurityRisk
  isHoldersSupported: Boolean!
  network: Network!
  imageUrl: String!
  onchainMarketData: OnchainMarketData
  isVerified: Boolean!
  holders(first: Float!, after: String): PaginatedSupportedTokenHolders
  holdersFollowedByAddress(address: Address!): [SupportedTokenHolder!]!
}

type FungibleTokenDelta implements Node {
  id: ID!
  address: String!
  amountRaw: BigDecimal!
  attachment: TokenDisplayItem!
  token: FungibleToken
  appToken: AppFungibleToken
  amount: Float
}

type FungibleTokenDeltaConnection {
  edges: [FungibleTokenDeltaEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type FungibleTokenDeltaEdge {
  node: FungibleTokenDelta!
  cursor: String!
}

input FungibleTokenInput {
  address: Address!
  network: Network!
}

type FungibleTokenSecurityRisk {
  reason: HiddenTokenReason!
  strategy: HiddenTokenMethod!
}

union FunginbleToken = AppFungibleToken | BaseFungibleToken

type GroupedSupportedBaseToken {
  uniqKey: String!
  name: String!
  symbol: String!
  coingeckoID: String
  imgUrl: String!
  newtworksAndAddresses: [TokenNetworkAndAddress!]!
  canExchange: Boolean
  hide: Boolean
}

enum HiddenTokenMethod {
  Manual
  GoPlus
  SpamDetection
}

enum HiddenTokenReason {
  Spam
  Rugpull
  Honeypot
  Worthless
  Arbitrary
}

input HoldersFollowedByAddressInput {
  address: Address!
}

type Image {
  """
  See https://blurha.sh/
  """
  blurhash: String
  width: Int
  height: Int

  """
  File size in bytes. Return `null` if unknown.
  """
  fileSize: Int

  """
  File mime type from https://www.iana.org/assignments/media-types/media-types.xhtml
  """
  mimeType: String
  url(
    """
    Deprecated, use `width` or the predefined field sizes
    """
    input: ImageUrlInput
    width: Int
    format: ImageFormat
  ): String!

  """
  Returns a link of the image 100px wide
  """
  thumbnail: String!

  """
  Returns a link of the image 250px wide
  """
  medium: String!

  """
  Returns a link of the image 500px wide
  """
  large: String!

  """
  Returns a link of the original image
  """
  original: String!
}

type ImageConnection {
  edges: [ImageEdge!]!
  pageInfo: PageInfo!
}

type ImageDisplayItem {
  type: String!
  url: String!
}

type ImageEdge {
  node: Image!
  cursor: String!
}

enum ImageFormat {
  webp
  avif
  json
}

enum ImageSize {
  THUMBNAIL
  MEDIUM
  LARGE
  ORIGINAL
}

input ImageUrlInput {
  size: ImageSize!
}

union Investment = AppTokenPosition | AppContractPosition

scalar JSON

type JupiterMarketData implements MarketData {
  type: MarketDataType!
  isExchangeable: Boolean!
  price(currency: Currency = USD): Float
}

type LensMetadata {
  name: String
  handleNamespace: String
  fullHandle: String
  description: String
  hey: String
  twitter: String
  website: String
  imageUrl: String
  coverImageUrl: String
}

type LensProfile {
  handle: String!
  metadata: LensMetadata!
}

interface MarketData {
  type: MarketDataType!
  isExchangeable: Boolean!
  price(currency: Currency = USD): Float
}

enum MarketDataType {
  COIN_GECKO
  JUPITER
  ONCHAIN
}

type MetadataItemWithLabel {
  label: String!
  item: AbstractMetadataItem!
}

enum MetaTypeV3 {
  WALLET
  SUPPLIED
  BORROWED
  CLAIMABLE
  VESTING
  LOCKED
  NFT
}

type Mutation {
  refreshNftMetadata(id: ID!): NFT
}

enum Network {
  ETHEREUM_MAINNET
  POLYGON_MAINNET
  OPTIMISM_MAINNET
  GNOSIS_MAINNET
  BINANCE_SMART_CHAIN_MAINNET
  FANTOM_OPERA_MAINNET
  AVALANCHE_MAINNET
  ARBITRUM_MAINNET
  CELO_MAINNET
  HARMONY_MAINNET
  MOONRIVER_MAINNET
  BITCOIN_MAINNET
  CRONOS_MAINNET
  AURORA_MAINNET
  EVMOS_MAINNET
  BASE_MAINNET
  BLAST_MAINNET
  SOLANA_MAINNET
  DEGEN_MAINNET
  MODE_MAINNET
  ZKSYNC_MAINNET
  MANTLE_MAINNET
  SCROLL_MAINNET
  MOONBEAM_MAINNET
  LINEA_MAINNET
  ZORA_MAINNET
  METIS_MAINNET
  WORLDCHAIN_MAINNET
  SHAPE_MAINNET
  OPBNB_MAINNET
  APECHAIN_MAINNET
  MORPH_MAINNET
  BOB_MAINNET
  UNICHAIN_MAINNET
  CORE_MAINNET
  RACE_MAINNET
  FRAX_MAINNET
  B2_MAINNET
  TAIKO_MAINNET
  CYBER_MAINNET
  ZERO_MAINNET
  IMMUTABLEX_MAINNET
  ARBITRUM_NOVA_MAINNET
  XAI_MAINNET
  REDSTONE_MAINNET
  POLYGON_ZKEVM_MAINNET
}

type NetworkDisplayItem {
  type: String!
  chainId: Float!
  networkType: NetworkIndexerType!
  networkMetadata: NetworkMetadata
}

type NetworkExchangeConfigurationObject {
  enabled: Boolean!
  suggestedTokenAddresses: [String!]!
  feeBasisPoints: Float!

  """
  Fee percentage eg. value of 0.5 -> 0.5% fee taken from total amount
  """
  feePercentage: Float!
  feeRecipientAddress: String
  exchangeProviderStrategy: String!
  exchangeProviderUrl: String!
}

enum NetworkIndexerType {
  EIP_155
  LAYER_ZERO
  WORMHOLE
}

type NetworkMetadata {
  chainId: Float!
  networkType: NetworkIndexerType!
  name: String!
  url: String!
}

type NetworkObject {
  id: Int!
  name: String!
  slug: String!
  enumValue: Network! @deprecated(reason: "Use network ID instead")
  enabled: Boolean!
  evmCompatible: Boolean @deprecated(reason: "Use vm instead")
  vm: VirtualMachineType!
  chainId: Int
  hasLiveFeedEtl: Boolean!
  holdingsEnabled: Boolean!
  nftBalancesEnabled: Boolean!
  holdingsComparisonJobEnabled: Boolean!
  thirdPartyBaseTokensEnabled: Boolean!
  onchainPricesEnabled: Boolean!
  activityFeedEnabled: Boolean!
  trendsEnabled: Boolean!
  pushNotificationEnabled: Boolean!
  farcasterZappyBotEnabled: Boolean!
  pnlEnabled: Boolean!
  multicallContractAddress: String
  wrappedGasTokenAddress: String
  blocksPerDayEstimate: Int
  blockScannerType: String
  blockScannerBaseUrl: String
  publicRpcUrl: String
  enabledAt: Timestamp
  exchangeConfiguration: NetworkExchangeConfigurationObject
}

interface NFT implements Node {
  id: ID!
  tokenId: String!
  rarityRank: Int @deprecated
  lastSaleEth: BigDecimal @deprecated(reason: "Use lastSale field instead")
  estimatedValueEth: BigDecimal @deprecated(reason: "Use estimatedValue field instead")
  supply: BigDecimal!
  circulatingSupply: BigDecimal!

  """
  ERC-1155 token can have multiple owners
  """
  holdersCount: BigDecimal!
  socialLinks: [SocialLink!]!
  collection: NftCollection!
  traits: [NftTrait!]!
  transfers(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    order: NftTransferConnectionOrderInput

    """
    Deprecated use the args
    """
    input: NftTransferConnectionInput
  ): NftTransferConnection
  mediasV2: [NftMediaV2!]!
  mediasV3: NftMedias!
  name: String!
  description: String

  """
  ERC-1155 token can have multiple owners
  """
  holders(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    last: Int

    """
    Cursor of an edge (excluded)
    """
    before: String
    followedBy: Address

    """
    Deprecated use the args
    """
    input: NftHolderConnectionInput
  ): NftHolderConnection!

  """
  ERC-1155 token can have multiple owners
  """
  holdersFollowedByAddress(input: HoldersFollowedByAddressInput!): [NftHolder!]!

  """
  Token was hidden by owner
  """
  isHidden(input: ByAddressInput!): Boolean!

  """
  Estimated value of the NFT
  """
  estimatedValue: NftValueDenomination

  """
  Last sale of the NFT
  """
  lastSale: NftValueDenomination
}

type NftAsset {
  balance: Float!
  balanceUSD: Float!
  assetImg: String!
  assetName: String!
  tokenId: String!
}

type NftAvatar {
  isCurrentlyHeld: Boolean!
  nft: NftToken!
}

type NftBalance {
  network: Network!
  balanceUSD: Float!
}

type NftBalanceCollection {
  id: String!
  name: String!
  floorPrice: Float!
  floorPriceUSD: Float!
  img: String!
  imgBanner: String!
  imgProfile: String!
  imgFeatured: String!
  description: String!
  socials: [NftSocialLink!]!
  owners: Float!
  items: Float!
  volume24h: Float!
  volume24hUSD: Float!
}

type NftCollection implements Node {
  id: ID!
  address: Address!
  subCollectionIdentifier: String!
  name: String!
  displayName: String
  symbol: String!
  description: String!
  network: Network!
  socialLinks: [SocialLink!]!

  """
  Image of the collection as an horizontal rectangle
  """
  bannerImageUrl: String @deprecated(reason: "Use `medias.banner`")

  """
  Image of the collection as a vertical rectangle
  """
  cardImageUrl: String @deprecated(reason: "Use `medias.card`")
  supply: BigDecimal!
  totalSupply: BigDecimal!
  floorPriceEth: BigDecimal @deprecated(reason: "Use floorPrice instead")
  floorPriceSourceMarketPlace: NftDataSourceMarketplace
  topOfferPriceEth: BigDecimal @deprecated(reason: "Use topOfferPrice instead")
  topOfferSourceMarketPlace: NftDataSourceMarketplace
  holdersCount: BigDecimal!
  nftStandard: NftStandard!

  """
  Disabled collection will return `null`
  """
  disabled: Boolean!
  type: NftCollectionType!
  openseaId: String
  spamScore: BigDecimal
  isApproved(spenderAddress: Address!, ownerAddress: Address!): Boolean!
  approvalTransaction(spenderAddress: Address!, ownerAddress: Address!): TransactionConfig!
  revokeApprovalTransaction(spenderAddress: Address!, ownerAddress: Address!): TransactionConfig!

  """
  Floor price of the NFT collection
  """
  floorPrice: NftValueDenomination

  """
  Top offer of the NFT collection
  """
  topOfferPrice: NftValueDenomination
  nfts(
    first: Int = 25

    """
    Cursor of an edge (excluded)
    """
    after: String
    tokenIds: [String!]
    owners: [Address!]
    traitIds: [String!]
    order: NftTokenConnectionOrderInput
    traits: [NftTokenTraitInput!]

    """
    Deprecated, use the args
    """
    input: NftConnectionInput
  ): NftTokenConnection!
  events(
    first: Int! = 25

    """
    Cursor of an edge (excluded)
    """
    after: String
    tokenIds: [String!]
    owners: [Address!]
    followedBy: Address
    traits: [NftTokenTraitInput!]
    period: NftPaymentStatsPeriod

    """
    Deprecated: use the args
    """
    input: CollectionEventConnectionInput
  ): CollectionEventConnection!
  traitGroups: [NftCollectionTraitGroupBase!]!
  traitGroupValues(input: NftCollectionTraitValuesArgs!): NftCollectionTraitValueConnection!
  traits: [NftCollectionTraitType!]!
  holders(input: NftHolderConnectionInput, first: Int, after: String): PaginatedNftHolder!
  medias: NftCollectionMedias!
  circulatingSupply: BigDecimal!
  totalCirculatingSupply: BigDecimal!
  groups: [NftCollectionGroup!]!
  marketCap: BigDecimal
}

type NFTCollectionDisplayItem {
  type: String!
  network: Network!
  collectionAddress: Address!
  quantity: Float
  nftCollection: NftCollection
}

type NftCollectionEdge {
  node: NftCollection!
  cursor: String!
}

type NftCollectionGroup implements Node {
  id: ID!
  key: String!
  name: String!
  description: String!
  socialLinks: [SocialLink!]!

  """
  Image of the collection group as a square
  """
  logoImageUrl: String

  """
  Image of the collection group as an horizontal rectangle
  """
  bannerImageUrl: String

  """
  Image of the collection group as a vertical rectangle
  """
  cardImageUrl: String
  disabled: Boolean!
  isCurated: Boolean!
  relatedContracts: [NftContract!]
  relatedCollectionType: NftCollectionType
}

type NftCollectionHolder implements Node {
  id: ID!

  """
  Number of unique items
  """
  holdCount: BigDecimal!

  """
  Total number of items - for ERC-1155
  """
  holdTotalCount: BigDecimal!
}

type NftCollectionHolderEdge {
  node: NftCollectionHolder!
  cursor: String!
}

input NftCollectionInput {
  address: Address
  collectionAddress: String
  subCollectionIdentifier: String
  network: Network!
}

type NftCollectionMedias {
  """
  Image of the collection as an horizontal rectangle
  """
  banner(excludeFormats: [NftMediaExcludeFormat!]): Image

  """
  Image of the collection as a vertical rectangle
  """
  card(excludeFormats: [NftMediaExcludeFormat!]): Image

  """
  Image of the collection as a square
  """
  logo(excludeFormats: [NftMediaExcludeFormat!]): Image
}

interface NftCollectionTraitGroupBase implements Node {
  id: ID!
  name: String!
  display: NftTraitDisplayType!
}

type NftCollectionTraitGroupNumericRange implements Node & NftCollectionTraitGroupBase {
  id: ID!
  name: String!
  display: NftTraitDisplayType!
  min: Float!
  max: Float!
}

type NftCollectionTraitGroupString implements Node & NftCollectionTraitGroupBase {
  id: ID!
  name: String!
  display: NftTraitDisplayType!
}

type NftCollectionTraitNumeric {
  value: String!
  display: NftTraitDisplayType!
  min: Float
  max: Float
}

type NftCollectionTraitString {
  value: String!
  values: [NftCollectionTraitValue!]
}

union NftCollectionTraitType = NftCollectionTraitString | NftCollectionTraitNumeric

type NftCollectionTraitValue implements Node {
  id: ID!
  value: String!
  estimatedValueEth: BigDecimal
  supply: BigDecimal!
  supplyPercentage: Float!
}

type NftCollectionTraitValueConnection {
  edges: [NftCollectionTraitValueEdge!]!
  pageInfo: PageInfo!
}

type NftCollectionTraitValueEdge {
  node: NftCollectionTraitValue!
  cursor: String!
}

input NftCollectionTraitValuesArgs {
  first: Int = 10

  """
  Cursor of an edge (excluded)
  """
  after: String
  traitName: String!
  search: String
}

enum NftCollectionType {
  GENERAL
  BRIDGED
  BADGE
  POAP
  TICKET
  ACCOUNT_BOUND
  WRITING
  GAMING
  ART_BLOCKS
  BRAIN_DROPS
  LENS_PROFILE
  LENS_FOLLOW
  LENS_COLLECT
  ZORA_ERC721
  ZORA_ERC1155
  BLUEPRINT
}

input NftConnectionInput {
  first: Int = 25

  """
  Cursor of an edge (excluded)
  """
  after: String

  """
  Cursor of an edge (excluded) to move backwards
  """
  before: String
  search: String
  tokenIds: [String!]
  owners: [Address!]
  traitIds: [String!]
  order: NftTokenConnectionOrderInput
  traits: [NftTokenTraitInput!]
}

type NftContract {
  address: Address!
  network: Network!
}

enum NftDataSourceMarketplace {
  OPENSEA
  X2Y2
  LOOKSRARE
  RESERVOIR
  BLUR
}

type NftDelta implements Node {
  id: ID!
  collectionAddress: String!
  tokenId: String!
  amount: Float!
  amountRaw: BigDecimal!
  attachment: NFTDisplayItem!
  nft: NftToken
}

type NftDeltaConnection {
  edges: [NftDeltaEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type NftDeltaEdge {
  node: NftDelta!
  cursor: String!
}

type NftDenomination {
  network: String!
  address: String!
  symbol: String!
  imageUrl: String
}

type NFTDisplayItem {
  type: String!
  network: Network!
  collectionAddress: Address!
  tokenId: String!
  quantity: Float
  nftToken: NftToken
  isMint: Boolean
  isBurn: Boolean
}

type NftHolder implements Node {
  id: ID!

  """
  Number of unique items
  """
  holdCount: BigDecimal!

  """
  Total number of items - for ERC-1155
  """
  holdTotalCount: BigDecimal!
}

type NftHolderConnection {
  edges: [NftHolderEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

input NftHolderConnectionInput {
  first: Int = 25

  """
  Cursor of an edge (excluded)
  """
  after: String

  """
  Cursor of an edge (excluded) to move backwards
  """
  before: String
  search: String
  followedBy: Address
}

type NftHolderEdge {
  node: NftHolder!
  cursor: String!
}

enum NftMediaExcludeFormat {
  SVG
  GIF
  AVIF
  WEBM
  HTML
}

type NftMedias {
  images(
    excludeFormats: [NftMediaExcludeFormat!]
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
  ): ImageConnection!
  animations(
    excludeFormats: [NftMediaExcludeFormat!]
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
  ): AnimationConnection!
  audios(
    excludeFormats: [NftMediaExcludeFormat!]
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
  ): AudioConnection!
}

union NftMediaV2 = Image | Animation | Audio

type NftPayment {
  tokenAddress: Address! @deprecated(reason: "Use `token`")
  tokenSymbol: String @deprecated(reason: "Use `token`")
  tokenValue: BigDecimal!
  tokenValueETH: BigDecimal!
  tokenValueUSD: BigDecimal!
}

enum NftPaymentStatsPeriod {
  Week
  Month
  Quarter
}

type NftSocialLink {
  name: String!
  url: String!
}

enum NftStandard {
  ERC_721
  ERC_1155
}

type NftToken implements NFT & Node {
  id: ID!
  tokenId: String!
  rarityRank: Int @deprecated
  lastSaleEth: BigDecimal @deprecated(reason: "Use lastSale field instead")
  estimatedValueEth: BigDecimal @deprecated(reason: "Use estimatedValue field instead")
  supply: BigDecimal!
  circulatingSupply: BigDecimal!

  """
  ERC-1155 token can have multiple owners
  """
  holdersCount: BigDecimal!
  socialLinks: [SocialLink!]!
  collection: NftCollection!
  traits: [NftTrait!]!
  transfers(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    order: NftTransferConnectionOrderInput

    """
    Deprecated use the args
    """
    input: NftTransferConnectionInput
  ): NftTransferConnection
  mediasV2: [NftMediaV2!]!
  mediasV3: NftMedias!
  name: String!
  description: String

  """
  ERC-1155 token can have multiple owners
  """
  holders(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    last: Int

    """
    Cursor of an edge (excluded)
    """
    before: String
    followedBy: Address

    """
    Deprecated use the args
    """
    input: NftHolderConnectionInput
  ): NftHolderConnection!

  """
  ERC-1155 token can have multiple owners
  """
  holdersFollowedByAddress(input: HoldersFollowedByAddressInput!): [NftHolder!]!

  """
  Token was hidden by owner
  """
  isHidden(input: ByAddressInput!): Boolean!

  """
  Estimated value of the NFT
  """
  estimatedValue: NftValueDenomination

  """
  Last sale of the NFT
  """
  lastSale: NftValueDenomination
}

type NftTokenConnection {
  edges: [NftTokenEdge!]!
  pageInfo: PageInfo!
}

input NftTokenConnectionOrderInput {
  orderBy: NftTokenSort!
  orderDirection: OrderDirectionOption = ASC
}

type NftTokenEdge {
  node: NftToken!
  cursor: String!
}

type NftTokenErc1155 implements NFT & Node {
  id: ID!
  tokenId: String!
  rarityRank: Int @deprecated
  lastSaleEth: BigDecimal @deprecated(reason: "Use lastSale field instead")
  estimatedValueEth: BigDecimal @deprecated(reason: "Use estimatedValue field instead")
  supply: BigDecimal!
  circulatingSupply: BigDecimal!

  """
  ERC-1155 token can have multiple owners
  """
  holdersCount: BigDecimal!
  socialLinks: [SocialLink!]!
  collection: NftCollection!
  traits: [NftTrait!]!
  transfers(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    order: NftTransferConnectionOrderInput

    """
    Deprecated use the args
    """
    input: NftTransferConnectionInput
  ): NftTransferConnection
  mediasV2: [NftMediaV2!]!
  mediasV3: NftMedias!
  name: String!
  description: String

  """
  ERC-1155 token can have multiple owners
  """
  holders(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    last: Int

    """
    Cursor of an edge (excluded)
    """
    before: String
    followedBy: Address

    """
    Deprecated use the args
    """
    input: NftHolderConnectionInput
  ): NftHolderConnection!

  """
  ERC-1155 token can have multiple owners
  """
  holdersFollowedByAddress(input: HoldersFollowedByAddressInput!): [NftHolder!]!

  """
  Token was hidden by owner
  """
  isHidden(input: ByAddressInput!): Boolean!

  """
  Estimated value of the NFT
  """
  estimatedValue: NftValueDenomination

  """
  Last sale of the NFT
  """
  lastSale: NftValueDenomination
}

type NftTokenErc721 implements NFT & Node {
  id: ID!
  tokenId: String!
  rarityRank: Int @deprecated
  lastSaleEth: BigDecimal @deprecated(reason: "Use lastSale field instead")
  estimatedValueEth: BigDecimal @deprecated(reason: "Use estimatedValue field instead")
  supply: BigDecimal!
  circulatingSupply: BigDecimal!

  """
  ERC-1155 token can have multiple owners
  """
  holdersCount: BigDecimal!
  socialLinks: [SocialLink!]!
  collection: NftCollection!
  traits: [NftTrait!]!
  transfers(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    order: NftTransferConnectionOrderInput

    """
    Deprecated use the args
    """
    input: NftTransferConnectionInput
  ): NftTransferConnection
  mediasV2: [NftMediaV2!]!
  mediasV3: NftMedias!
  name: String!
  description: String

  """
  ERC-1155 token can have multiple owners
  """
  holders(
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    last: Int

    """
    Cursor of an edge (excluded)
    """
    before: String
    followedBy: Address

    """
    Deprecated use the args
    """
    input: NftHolderConnectionInput
  ): NftHolderConnection!

  """
  ERC-1155 token can have multiple owners
  """
  holdersFollowedByAddress(input: HoldersFollowedByAddressInput!): [NftHolder!]!

  """
  Token was hidden by owner
  """
  isHidden(input: ByAddressInput!): Boolean!

  """
  Estimated value of the NFT
  """
  estimatedValue: NftValueDenomination

  """
  Last sale of the NFT
  """
  lastSale: NftValueDenomination
}

enum NftTokenSort {
  RARITY_RANK
  LAST_SALE_ETH
  ESTIMATED_VALUE_ETH
}

input NftTokenTraitInput {
  type: String!
  value: String!
}

type NftTrait implements Node {
  id: ID!
  attributeName: String!
  attributeValue: String!
  estimatedValueEth: BigDecimal @deprecated(reason: "Use estimatedValue instead")
  supply: BigDecimal!
  supplyPercentage: Float!
}

enum NftTraitDisplayType {
  STRING
  NUMBER
  BOOST_NUMBER
  BOOST_PERCENTAGE
  DATE
}

type NftTransfer implements Node {
  id: ID!
  timestamp: Int!
  txHash: String!
  network: Network!
  payments: [NftPayment!]!
}

type NftTransferConnection {
  edges: [NftTransferEdge!]!
  pageInfo: PageInfo!
}

input NftTransferConnectionInput {
  offset: Int = 0
  first: Int = 25

  """
  Cursor of an edge (excluded)
  """
  after: String
  search: String
  order: NftTransferConnectionOrderInput
}

input NftTransferConnectionOrderInput {
  orderBy: NftTransferSort!
  orderDirection: OrderDirectionOption!
}

type NftTransferEdge {
  node: NftTransfer!
  cursor: String!
  heldForInSeconds: Int
}

enum NftTransferSort {
  TIMESTAMP
}

type NftUserCollectionConnection {
  edges: [NftUserCollectionEdge!]!
  pageInfo: PageInfo!
}

type NftUserCollectionEdge {
  node: NftCollection!
  cursor: String!
}

input NftUsersCollectionsConnectionInput {
  owners: [Address!]!
  network: Network
  minCollectionValueUsd: Float

  """
  Deprecated: use `collectionIds` instead
  """
  collections: [Address!]

  """
  Deprecated: use `collectionIds` instead
  """
  collectionInputs: [NftCollectionInput!]
  collectionIds: [ID!]
  standard: NftStandard
  search: String
  onlyHidden: Boolean
  withOverrides: Boolean
  first: Int = 24

  """
  Cursor of an edge (excluded)
  """
  after: String
}

input NftUsersTokensConnectionInput {
  owners: [Address!]!
  network: Network
  minEstimatedValueUsd: Float

  """
  Deprecated: use `collectionIds` instead
  """
  collections: [Address!]

  """
  Deprecated: use `collectionIds` instead
  """
  collectionInputs: [NftCollectionInput!]
  collectionIds: [ID!]
  standard: NftStandard
  search: String
  onlyHidden: Boolean
  withOverrides: Boolean
  first: Int = 24

  """
  Cursor of an edge (excluded)
  """
  after: String
}

type NftUserTokenBalance {
  balance: BigDecimal!
  valuationStrategy: NftValuationStrategy!
  user: User! @deprecated(reason: "Use `account` instead to take advantage of the `Account` type")
  account: Account!
}

type NftUserTokenConnection {
  edges: [NftUserTokenEdge!]!
  pageInfo: PageInfo!
}

type NftUserTokenEdge {
  node: NftToken!
  cursor: String!
  ownedAt: DateTime
  token: NftToken! @deprecated(reason: "Use `node`")
  balances: [NftUserTokenBalance!]!
}

enum NftValuationStrategy {
  TOP_OFFER
  ESTIMATED_VALUE
  OVERRIDE
}

type NftValueDenomination {
  valueUsd: Float!
  valueWithDenomination: Float!
  denomination: NftDenomination!
}

interface Node {
  id: ID!
}

type NonFungiblePositionBalance implements AbstractToken {
  type: String!
  address: String!
  network: Network!
  balance: String!
  balanceUSD: Float!
  price: Float!
  symbol: String!
  decimals: Float!
  collection: NftBalanceCollection
  assets: [NftAsset!]
}

type NonFungibleTokenBreakdown implements AbstractBreakdown {
  appId: String
  metaType: MetaTypeV3
  address: Address!
  network: Network!
  balanceUSD: Float!
  type: BreakdownType!
  breakdown: [AbstractBreakdown!]!
  context: NonFungibleTokenBreakdownContext!
  assets: [NonFungibleTokenBreakdownAsset!]!
  displayProps: NonFungibleTokenBreakdownDisplayProps!
}

type NonFungibleTokenBreakdownAsset {
  tokenId: String!
  balance: Float!
  assetImg: String!
  balanceUSD: Float!
  assetName: String!
}

type NonFungibleTokenBreakdownContext {
  incomplete: Boolean!
  openseaId: String!
  floorPrice: Float!
  holdersCount: Float!
  amountHeld: Float!
}

type NonFungibleTokenBreakdownDisplayProps {
  label: String!
  secondaryLabel: AbstractDisplayItem
  tertiaryLabel: AbstractDisplayItem
  balanceDisplayMode: BalanceDisplayMode!
  images: [String!]!
  stats: [DisplayItemWrapper!]!
  info: [DisplayItemWrapper!]!
  profileImage: String!
  profileBanner: String!
  featuredImage: String
}

type NonFungibleTokenPosition implements AbstractPosition {
  appId: String! @deprecated(reason: "no app for non-fungible tokens")
  type: ContractType!
  network: Network!
  appName: String! @deprecated(reason: "no app for non-fungible tokens")
  address: String!
  symbol: String!
  decimals: Int!
  price: Float!
  assets: [NftAsset!]
  displayProps: NonFungibleTokenBreakdownDisplayProps!
}

type NumberDisplayItem {
  type: String!
  value: Float! @deprecated(reason: "use numberValue instead")
  numberValue: Float!
}

type NumberMetadataItem implements AbstractMetadataItem {
  type: String!
  valueNumber: Float!
}

enum OnchainEntityType {
  TOKEN
  DAO
  NFT_COLLECTION
}

type OnchainHistoricalPrice {
  timestamp: Timestamp!
  price: Float!
}

type OnchainMarketData implements MarketData {
  type: MarketDataType!
  isExchangeable: Boolean!
  price(currency: Currency = USD): Float
  historicalPrice(currency: Currency = USD, timestamp: Timestamp!): OnchainHistoricalPrice
  marketCap: Float
  totalLiquidity(currency: Currency = USD): Float
  totalGasTokenLiquidity: Float
  priceChange5m: Float
  priceChange1h: Float
  priceChange24h: Float
  priceTicks(currency: Currency!, timeFrame: TimeFrame!): [OnchainMarketDataPriceTick!]!
}

type OnchainMarketDataLatestSwap implements Node {
  id: ID!
  transactionHash: String!
  timestamp: Timestamp!
  soldAmount: Float!
  soldTokenAddress: Address!
  boughtAmount: Float!
  boughtTokenAddress: Address!
  gasTokenVolume: Float!
  volumeUsd: Float!
}

type OnchainMarketDataLatestSwapEdge {
  node: OnchainMarketDataLatestSwap!
  cursor: String!
}

type OnchainMarketDataPriceTick {
  median: Float!
  open: Float!
  close: Float!
  high: Float!
  low: Float!
  timestamp: Timestamp!
}

type OnChainTransaction {
  network: Network!
  hash: String!
  nonce: Int!
  blockHash: String!
  blockNumber: Int!
  value: String!
  gasPrice: String!
  gas: Int!
  input: String!
  from: Address!
  fromUser: Account
  to: Address
  timestamp: Timestamp!
  receipt: OnChainTransactionReceipt
  logs: [OnChainTransactionLog!]!
  link: String!
  fromEns: String
  transactionFee: Float!
  transactionPrice: Float!
  toUser: Account
  decodedInput: DecodedInput
  decodedInputV2: DecodedInputV2
}

type OnChainTransactionLog {
  address: String!
  data: String!
  topics: [String!]!
  logIndex: Int!
  transactionIndex: Int!
}

type OnChainTransactionReceipt {
  contractAddress: Address
  gasUsed: Int!
  status: Int!
}

enum OrderDirectionOption {
  DESC
  ASC
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
  startCursor: String
  endCursor: String
}

type PaginatedNftHolder {
  edges: [NftCollectionHolderEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type PaginatedSupportedTokenHolders {
  edges: [SupportedTokenHolderEdge!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type PaginatedUser {
  edges: [UserEdge!]!
  totalCount: Int!
}

type PaginationTotals {
  count: BigDecimal!
  totalCount: BigDecimal
  balanceUSD: BigDecimal!
}

type ParamType {
  type: String!
  name: String
  indexed: Boolean
  components: [ParamType!]
}

"""
Float in percent points without the "%" character, standard range between 0 and 100 (e.g. 62.4 means 62.4%)
"""
scalar Percentage

type PercentageMetadataItem implements AbstractMetadataItem {
  type: String!
  valuePct: Float!
}

type Portfolio {
  appBalances: [AppBalance!]!
  tokenBalances: [TokenBalance!]!
  nftBalances: [NftBalance!]!
  totals: PortfolioTotals!
  proxies: [ProxyAccount!]!
}

type PortfolioHolding {
  key: String!
  label: String!
  balanceUSD: Float!
  pct: Float!
}

type PortfolioTotals {
  total: Float!
  appsTotal: Float!
  totalWithNFT: Float!
  totalByNetwork: [TotalByNetwork!]!
  totalByNetworkWithNFT: [TotalByNetwork!]!
  totalByAddress: [TotalByAddress!]!
  claimables: [ClaimableToken!]!
  debts: [ClaimableToken!]!
  holdings: [PortfolioHolding!]!
}

type PositionBreakdown implements AbstractBreakdown {
  appId: String
  metaType: MetaTypeV3
  address: Address!
  network: Network!
  balanceUSD: Float!
  type: BreakdownType!
  breakdown: [AbstractBreakdown!]!
  displayProps: TokenBreakdownDisplayProps!
}

type PositionBreakdownDisplayProps {
  label: String!
  secondaryLabel: AbstractDisplayItem
  tertiaryLabel: AbstractDisplayItem
  images: [String!]!
  balanceDisplayMode: BalanceDisplayMode!
  stats: [DisplayItemWrapper!]!
  info: [DisplayItemWrapper!]!
}

type ProductItem {
  label: String!
  assets: [AbstractPositionBalance!]!
  meta: [MetadataItemWithLabel!]!
}

type ProposalDisplayItemObject {
  type: String!
  id: ID!
  network: Network!
  platform: String!
}

type ProxyAccount {
  ownerAddress: Address!
  address: Address!
  networkId: ID!
  network: Network!
  appId: String @deprecated(reason: "Use `app.slug` field instead")
  app: App
  owner: Account!
  networkV2: NetworkObject!
}

type Query {
  portfolio(
    """
    The wallet addresses for which to fetch balances for.
    """
    addresses: [Address!]!

    """
    The networks on which to fetch balances for.
    """
    networks: [Network!]

    """
    The appIds for which to fetch balances for.
    """
    appIds: [String!]

    """
    Whether to include NFT overrides in the balances.
    """
    withOverrides: Boolean = false
  ): Portfolio!
  accountsTimeline(
    network: Network
    networks: [Network!]
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    spamFilter: Boolean = true
    realtimeInterpretation: Boolean = false
    addresses: [Address!]
    tokenAddresses: [Address!]
    isSigner: Boolean
  ): ActivityEventConnection!
  timelineEvent(transactionHash: String!, network: Network!): ActivityEvent
  timelineForApp(
    network: Network
    networks: [Network!]
    first: Int

    """
    Cursor of an edge (excluded)
    """
    after: String
    spamFilter: Boolean = true
    realtimeInterpretation: Boolean = false
    slug: String!
  ): ActivityEventConnection!
  accounts(addresses: [Address!]!): [Account!]!
  nftNetWorth(addresses: [Address!]!, network: Network, withOverrides: Boolean): BigDecimal
  nftUsersCollectionsTotals(
    network: Network
    minCollectionValueUsd: Float
    search: String

    """
    Deprecated: use `collectionIds` instead
    """
    collections: [Address!]

    """
    Deprecated: use `collectionIds` instead
    """
    collectionInputs: [NftCollectionInput!]
    collectionIds: [ID!]
    standard: NftStandard
    onlyHidden: Boolean
    owners: [Address!]!
    withOverrides: Boolean
  ): PaginationTotals!
  nftUsersCollections(
    network: Network
    minCollectionValueUsd: Float
    search: String

    """
    Deprecated: use `collectionIds` instead
    """
    collections: [Address!]

    """
    Deprecated: use `collectionIds` instead
    """
    collectionInputs: [NftCollectionInput!]
    collectionIds: [ID!]
    standard: NftStandard
    onlyHidden: Boolean

    """
    Nullable will be removed in the future so do not send something nullable
    """
    owners: [Address!]
    first: Int = 24

    """
    Cursor of an edge (excluded)
    """
    after: String
    input: NftUsersCollectionsConnectionInput
    withOverrides: Boolean
  ): NftUserCollectionConnection!
  nftUsersTokensTotals(
    network: Network
    minEstimatedValueUsd: Float
    search: String

    """
    Deprecated: use `collectionIds` instead
    """
    collections: [Address!]

    """
    Deprecated: use `collectionIds` instead
    """
    collectionInputs: [NftCollectionInput!]
    collectionIds: [ID!]
    standard: NftStandard
    onlyHidden: Boolean
    owners: [Address!]!
    withOverrides: Boolean
  ): PaginationTotals!
  nftUsersTokens(
    network: Network
    minEstimatedValueUsd: Float
    search: String

    """
    Deprecated: use `collectionIds` instead
    """
    collections: [Address!]

    """
    Deprecated: use `collectionIds` instead
    """
    collectionInputs: [NftCollectionInput!]
    collectionIds: [ID!]
    standard: NftStandard
    onlyHidden: Boolean

    """
    Nullable will be removed in the future so do not send something nullable
    """
    owners: [Address!]
    first: Int = 24

    """
    Cursor of an edge (excluded)
    """
    after: String
    input: NftUsersTokensConnectionInput
    withOverrides: Boolean
  ): NftUserTokenConnection!
  nftToken(collectionAddress: String!, network: Network!, tokenId: String!): NFT
  nftCollections(collections: [NftCollectionInput!]!): [NftCollection!]!
  fungibleToken(address: Address!, network: Network!): FungibleToken
  fungibleTokensByAddresses(tokens: [FungibleTokenInput!]!): [FungibleToken]!
}

type SocialLink {
  name: String!
  label: String!
  url: String!
  logoUrl: String!
}

type SocialStats {
  followersCount: Int!
  followedCount: Int!
  addedFollowersCountLast24Hours: Int!
}

type StatsItem {
  label: String!
  value: AbstractDisplayItem!
}

type StringDisplayItem {
  type: String!
  value: String! @deprecated(reason: "use stringValue instead")
  stringValue: String!
}

type StringMetadataItem implements AbstractMetadataItem {
  type: String!
  valueString: String!
}

type SupportedBaseToken implements Node {
  id: ID!
  address: String!
  network: Network!
  label: String
  name: String!
  decimals: Float!
  imgUrl: String!
  symbol: String!
  holders: PaginatedSupportedTokenHolders
  holdersFollowedByAddress: [SupportedTokenHolder!]!
  coingeckoID: String
  canExchange: Boolean
  verified: Boolean!
  hide: Boolean
  totalSupply: String
  price: Float!
  dailyVolume: Float
  createdAt: Timestamp!
  updatedAt: Timestamp!
}

type SupportedBaseTokenHistoricData {
  price1HourAgo: Float!
  price24HoursAgo: Float!
  price7DaysAgo: Float!
  price30DaysAgo: Float!
  volume1HourAgo: Float!
  volume24HoursAgo: Float!
  volume7DaysAgo: Float!
  volume30DaysAgo: Float!
  priceChange1Hour: Float
  priceChange24Hours: Float
  priceChange7Days: Float
  priceChange30Days: Float
  volumeChange1Hour: Float
  volumeChange24Hours: Float
  volumeChange7Days: Float
  volumeChange30Days: Float
}

type SupportedTokenHolder {
  holderAddress: String!
  value: String!
  percentileShare: Float!
}

type SupportedTokenHolderEdge {
  node: SupportedTokenHolder!
  cursor: String!
}

enum TimeFrame {
  HOUR
  DAY
  WEEK
  MONTH
  YEAR
}

"""
`Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch.
"""
scalar Timestamp

type TokenBalance {
  key: String!
  address: String!
  network: Network!
  token: BaseTokenBalance!
  proxy: ProxyAccount @deprecated(reason: "Use `proxies` on the `Portfolio` object instead")
  updatedAt: Timestamp!
}

type TokenBreakdown implements AbstractBreakdown {
  appId: String
  metaType: MetaTypeV3
  address: Address!
  network: Network!
  balanceUSD: Float!
  type: BreakdownType!
  breakdown: [AbstractBreakdown!]!
  context: TokenBreakdownContext!
  displayProps: TokenBreakdownDisplayProps!
}

type TokenBreakdownContext {
  balance: Float!
  balanceRaw: String!
  price: Float!
  name: String
  symbol: String!
  decimals: Float!
  verified: Boolean
}

type TokenBreakdownDisplayProps {
  label: String!
  secondaryLabel: AbstractDisplayItem
  tertiaryLabel: AbstractDisplayItem
  balanceDisplayMode: BalanceDisplayMode!
  images: [String!]!
  stats: [DisplayItemWrapper!]!
  info: [DisplayItemWrapper!]!
}

type TokenContractDisplayItem {
  type: String!
  network: Network!
  address: Address!
  token: FunginbleToken
}

type TokenDisplayItem {
  type: String!
  network: Network!
  tokenAddress: Address!
  amountRaw: String!
  token: FunginbleToken
  id: ID!
  tokenV2: FungibleToken
}

type TokenNetworkAndAddress {
  network: Network!
  address: String!
}

type TokenWithMetaType {
  metaType: MetaTypeV3
  token: AbstractToken!
}

type TotalByAddress {
  address: String!
  total: Float!
}

type TotalByNetwork {
  network: Network!
  total: Float!
}

type TransactionConfig {
  data: String!
  to: Address!
  from: Address!
}

type TransactionDisplayItem {
  type: String!
  event: ActivityEvent!
}

type TrendingTokenEdge {
  node: SupportedBaseToken!
  cursor: String!
  historicData: SupportedBaseTokenHistoricData!
}

"""
Deprecated: Use `Account` instead
"""
type User {
  address: Address!
  ens: String
  avatar: NftToken
  blockiesURI: String!
  blockieUrl: String
  level: Int!
  levelUpXpRequired: Int!
  xp: Int!
  zp: Int!
  pendingZp: Int!
  avatarURI: String
  socialStats: SocialStats!
  badges: [Badge!]!
  followedBy: Boolean!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum VirtualMachineType {
  EVM
  SVM
  BITCOIN
}

type Wallet {
  address: Address!
  ens: String
}

type WalletTokenBalanceToken {
  id: ID!
  address: String!
  network: Network!
  label: String
  imgUrl: String!
  name: String!
  decimals: Float!
  symbol: String!
  verified: Boolean!
  price: Float!
}
```
