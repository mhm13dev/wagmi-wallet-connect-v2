export class Config {
  public static readonly APP_NAME = "Wagmi - WalletConnect - mhm13dev";

  public static readonly Blockchain = {
    WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  };
}
