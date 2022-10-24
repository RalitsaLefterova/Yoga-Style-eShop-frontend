export default authHeader = () => {
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
  return user && user.token ? { 
    Authorization: `Bearer ${user.token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  } : {}
}