import Api from './api'

class PostService {
  static async getPost(id: string) {
    const response = await Api.get(`/${id}`)
    return response.data
  }
}

export default PostService
