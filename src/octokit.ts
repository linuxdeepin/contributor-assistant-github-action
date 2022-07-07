import { getOctokit } from '@actions/github'
const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");

const githubActionsDefaultToken = process.env.GITHUB_TOKEN
const personalAcessToken = process.env.PERSONAL_ACCESS_TOKEN as string
const appPivateKey = process.env.APP_PRIVATE_KEY as string
const appId = process.env.APP_ID as string

export const octokit = getOctokit(githubActionsDefaultToken as string)
export const octokitUsingPAT = isPersonalAccessTokenPresent() ?  getOctokit(personalAcessToken as string) : octokit
export const octokitUsingAPP = isAppPrivateLeyPresent() ?  new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: appId,
      privateKey: appPivateKey,
    }
  }) : octokit

export function isPersonalAccessTokenPresent(): boolean {

    return (typeof personalAcessToken !== "undefined")
}

export function isAppPrivateLeyPresent(): boolean {

    return (typeof appPivateKey !== "undefined" && typeof appId !== "undefined")
}
