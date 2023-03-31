export interface CredentialResponse {
  credential?: string
  // select_by?:
  //   | "auto"
  //   | "user"
  //   | "user_1tap"
  //   | "user_2tap"
  //   | "btn"
  //   | "btn_confirm"
  //   | "brn_add_session"
  //   | "btn_confirm_add_session"
  clientId?: string
}

export interface IdConfiguration {
  client_id: string
  callback: (handleCredentialResponse: CredentialResponse) => void
}

export interface GsiButtonConfiguration {
  type: "standard" | "icon"
  theme?: "outline" | "filled_blue" | "filled_black"
  size?: "large" | "medium" | "small"
  text?: "signin_with" | "signup_with" | "continue_with" | "signup_with"
  shape?: "rectangular" | "pill" | "circle" | "square"
  logo_alignment?: "left" | "center"
  width?: string
  local?: string
}