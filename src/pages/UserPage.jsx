// import React from 'react'
// import { users } from '../data/users'
// import { useFollowLogics } from '../custom/FollowLogics'
// const UserPage = () => {
//     const { isFollowing } = useFollowLogics()
//     return (
//         <div>
//             {users.map(i => (
//                 <div>
//                     <div key={i.id}>
//                         <h1>{i.avatar}</h1>

//                     </div>
//                     <div>
//                         <div>
//                             <h1>{i.name}</h1>
//                         </div>
//                         <div>
//                             <h1>{i.posts}</h1>
//                             <h1>{i.followers}</h1>
//                             <h1>{i.following}</h1>
//                         </div>

//                     </div>
//                     <div>
//                         <h1>{i.bio}</h1>
//                     </div>
//                     <div>
//                         <button onClick={() => isFollowing(i.id)}>
//                             {isFollowing ? follow : unfollow}
//                         </button>
//                     </div>
//                 </div>





//             ))}
//         </div>
//     )
// }

// export default UserPage