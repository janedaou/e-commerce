export interface loginResponse {
    AccessToken: string;
    ExpiresIn: number;
    ResfreshExpiresIn: number;
    RefreshToken: string;
    TokenType: string;
    NotBeforePolicy: number;
    SessionState: string;
    Scope: string;
    token: string;
}