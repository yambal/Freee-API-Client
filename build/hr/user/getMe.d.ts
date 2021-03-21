import { HrUser } from '../hrTypes';
/**
 * ログインユーザの取得
 * このリクエストの認可セッションにおけるログインユーザの情報を返します。
 * 人事労務freeeでは一人のログインユーザを複数の事業所に関連付けられるため、
 * このユーザと関連のあるすべての事業所の情報をリストで返します。
 * @param token 認証済みのAccessToken
 * @returns ユーザーの
 */
export declare const getMe: (token: string) => Promise<HrUser>;
