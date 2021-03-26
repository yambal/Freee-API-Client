import * as free from '../build/index'
import { ApiClientError, HrUser } from '../build/index'

free.hr.user.getMe('token')
.then((data: HrUser) => {

})
.catch((error: ApiClientError) => {

})
