//引入重新封装的axios实例
import http from './axios'

//暴露（导出）接口
/* 菜单管理接口 */
//封装菜单添加接口
export function getMenuAdd(data){
    return http.post('/api/menuadd',data)
}
//封装菜单列表接口
export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })
}
//封装菜单获取（一条）接口
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
//封装菜单修改接口
export function getMenuEdit(data){
    return http.post('/api/menuedit',data)
}
//封装菜单删除接口
export function getMenuDelete(data){
    return http.post('/api/menudelete',data)
}

//封装角色管理的接口
//封装角色列表的接口
export function getRoleList(){
    return http.get('/api/rolelist')
}
//封装角色添加的接口
export function getRoleAdd(data){
    return http.post('/api/roleadd',data)
}
//封装角色获取一条数据的接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}
//封装角色获修改的接口
export function getRoleEdit(data){
    return http.post('/api/roleedit',data)
}
//封装角色获删除的接口
export function getRoleDelete(data){
    return http.post('/api/roledelete',data)
}

//封装管理员管理的接口

//封装管理员的添加接口
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}

//封装管理员总数接口
export function getUserCount(){
    return http.get('/api/usercount')
}
//封装管理员接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
//封装获取一条管理员信息的接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}
//封装管理员修改的接口
export function getUserEdit(data){
    return http.post('/api/useredit',data)
}
//封装管理员删除的接口
export function getUserDelete(data){
    return http.post('/api/userdelete',data)
}
//封装管理员登录的接口
export function getUserLogin(data){
    return http.post('/api/userlogin',data)
}


//封装商品添加的接口
export function getCateAdd(data){
    return http.post('/api/cateadd',data)
}
//封装商品分类列表的接口
export function getCateList(params){
    return http.get('/api/catelist',{
        params
    })
}
//封账商品获取一条数据的接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装商品分类的修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
//封装商品分类的删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}


/* 商品规格管理接口 */
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}

//封装会员管理的接口
//封装会员的列表获取
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员获取一条的管理
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员修改的接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}
//轮播图管理的接口
//封装轮播图添加的接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
//封装轮播图的列表的获取的接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
//封装轮播图获取一条数据的接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改的接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
//封装轮播图的删除的接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}

//封装限时秒杀的接口
//封装显示秒杀的添加的接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装显示秒杀的列表的接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装显示秒杀的获取一条数据的接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀的修改的接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀的删除的接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}


//封装商品管理的接口
//封装商品添加的接口
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//封装商品总数的接口
export function getGoodsCount(params){
    return http.get('/api/goodscount',{
        params
    })
}

//封装商品管理的分类的接口
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//封装获取商品管理的一条的数据的接口
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}

//封装商品管理的修改的接口
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}

//封装商品管理的删除的接口
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}