export class Config {
  public static readonly APP_NAME = "Wagmi - WalletConnect - mhm13dev";

  public static readonly Blockchain = {
    WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY!,
    SUPPORTED_CHAIN_IDS: [56],
  };

  public static readonly PRODUCTION_ASSETS_WALLET =
    "0x9Dc3681D376E8Ddf2051882eee4CddB7b9581eee";
}
