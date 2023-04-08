export class Config {
  public static readonly APP_NAME = "Wagmi - mhm13dev";

  public static readonly Blockchain = {
    INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY!,
    WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  };
}
