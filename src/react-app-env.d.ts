type repoType = {
    cursor: string,
    node: {
      createdAt: string,
      id: string,
      name: string,
      owner: {
        login: string,
        avatarUrl: string
      },
      url: string
      homepageUrl: string,
    }
  }