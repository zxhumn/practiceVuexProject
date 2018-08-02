<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                    <ProductZoomer
                                    :baseImages="images"
                                    :base-zoomer-options="zoomerOptions"
                                    ></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.subtitle}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click="num==1?1:num--"  :isDisabled="{is-disabled:num==goodsinfo.stock_quantity}" role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span  @click="num<goodsinfo.stock_quantity?num++:goodsinfo.stock_quantity" role="button" :class="{'is-disabled':num==1}" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="num"
                                                         autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner"
                                                            role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1"
                                                            aria-disabled="false">
                                                           
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                                <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="isShowDec=true" href="javascript:;" :class="{selected:isShowDec}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a  @click="isShowDec=false" :class="{selected:!isShowDec}" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-html="goodsinfo.content"
                             class="tab-content entry" :style="{display:isShowDec? 'block':'none'}">
                            </div>
                            <div class="tab-content" :style="{display:!isShowDec? 'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="inputMessage" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="publicComments" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentMessage" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page  @on-change="changePage($event)" @on-page-size-change="changePageSize($event)" :total="totalCount" :page-size-opts="[5,10,15,20]" placement="top" size="small" show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                               
                                            <router-link :to="`/goodsInfo/`+item.id">                                            
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                                <router-link :to="'/goodsInfo/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
    // 放大镜轮播图模块引入
import ProductZoomer from 'vue-product-zoomer';
    export default {
        data:function(){
            return {
                goodsinfo:[],
                imglist:[],
                hotgoodslist:[],
                // 购买数量
                num:1,
                pageIndex :1,
                // 每页显示的条数
                pageSize:10,
                // 总条数
                totalCount:0,
                // 评论内容
                commentMessage:[],
                // 输入的评论
                inputMessage:'',
                // 轮播图
                images: {                    
                    normal_size: []                    
                },
                // 显示商品介绍项
                isShowDec:true,
                // 配置
                zoomerOptions: {
                    zoomFactor: 3,
                    pane: 'container-round',
                    hoverDelay: 300,
                    namespace: 'inline-zoomer',
                    move_by_click:true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"
                    }
            }
        },
        methods:{
            // 获取商品详情
            getGoodsInfo(){
                // 强制初始化
                this.imglist = [],
                this.images.normal_size = [],
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
                .then(response=>{
                    // console.log(response);
                    this.goodsinfo = response.data.message.goodsinfo;
                    this.imglist = response.data.message.imglist;
                    this.hotgoodslist = response.data.message.hotgoodslist;
                    this.imglist.forEach((v,i)=>{
                        this.images.normal_size.push({
                            id:v.id,
                            url:v.original_path
                        })
                    })
                  
                }).catch(err=>{
                    console.log(err);
                })
            }
            // 获取分页评论
            ,getComments(){
                this.axios.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then(response=>{
                    // console.log(response);
                    this.commentMessage = response.data.message;
                    this.totalCount = response.data.totalcount;
                }).catch(err=>{})
            }
            // 页码改变
            ,changePage(page){
                // console.log(page);
                this.pageIndex = page;
                this.getComments();

            },
            // 页容量改变
            changePageSize(size){
                // console.log(size);
                this.pageSize = size;
                this.getComments();
            }
            // 发表评论
            ,publicComments(){
                if(this.inputMessage==''){
                    this.$Message.error({
                        content: "对方不想理你,并且想你抛出了世界上最好的语言",
                        closable: true
                    })
                    return;
                }
                // 发表
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
                    commenttxt:this.inputMessage
                })
                .then(response=>{
                    // console.log(response);
                    if(response.data.status==0){
                        // 评论成功
                        this.$Message.success('发表成功');
                        // 去第一页
                        this.pageIndex = 1;
                        this.getComments();
                    }
                }).catch(err=>{})
                // 清空评论
                this.inputMessage = '';
            }
        },
        created() {
            this.getGoodsInfo();
            this.getComments();
        },
        // 轮播图组件
        components: {
            ProductZoomer
        },
        // 监听
        watch:{
            $route(to,from){
                this.getGoodsInfo();
                this.getComments();
            }
        }
    }
</script>
<style>
    /* 引入字体图标 */
    @import url('../../node_modules/font-awesome/css/font-awesome.min.css');
    .pic-box {
        width: 368px;
    }
    .control-box {
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    .control i {
            text-align: center;
        }
    .thumb-list img {
        width: 60px;
        height: 60px;
        margin: 10px;
    }
</style>