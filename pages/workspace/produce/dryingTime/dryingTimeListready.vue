<template>
  <view class="maintainlis u-padding-25">
    <!-- <u-form :model="maintForm" ref="uForm">
      <u-form-item :leftIconStyle="{color: '#969696', fontSize: '23rpx'}" left-icon="search" label-width="25" label-position="left" label="" class="searchsty">
        <u-input v-model="maintForm.searchKey" placeholder-style="line-height: 63rpx;color: #969696;fontSize: 23rpx" placeholder="请输入设备编号搜索" type="text" />
        <u-button slot="right" :hair-line="false" class="custom-style" size="mini" @click="searchByKey()">查询</u-button>
      </u-form-item>
    </u-form> -->
    <scroll-view :scroll-top="0" scroll-y="true" class="contsty" @scrolltolower="getBottom">
      <view v-if="!isDetail">
        <view v-for="(item, index) of list" :key="index" class="listy">
          <u-row @click="findDetail(item)">
            <u-col class="u-padding-top-26 u-padding-bottom-26 u-padding-left-26" span="8">
              <view class="itemsty">
                设备编号：
                <view class="valuesty">{{item.deviceCode}}</view>
              </view>
              <view class="itemsty">
                生产指令：
                <view class="valuesty">{{item.productOrder}}</view>
              </view>
              <view class="itemsty">
                零件代码：
                <view class="valuesty">{{item.productName}}</view>
              </view>
              <view class="itemsty">
                增加烘料时长：
                <view class="valuesty">{{item.addTime}}</view>
              </view>
            </u-col>
          </u-row>
          <div class="subscript">
            完成
          </div>
        </view>
        <u-loadmore :status="status" />
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      maintForm: {
        devicesCode: ''
      },
      list: [],
      station: 1, //0 是查询待检点项目   1是查询已完成
      devicesCode: '',
      pageIndex: 1,
      pageSize: 10,
      status: 'loadmore',
      isDetail: false,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    searchByKey() {
      this.list = []
      this.pageIndex = 1
      this.pageSize = this.pageSize
      this.getList()
    },
    getList() {
      this.$u
        .get(this.apiUrl.getDryingTimeList, {
          pageNum: this.pageIndex,
          pageSize: this.pageSize
        })
        .then(res => {
          for (const item of res.data.list) {
            this.list.push(item)
          }
          this.total = res.data.total
          if (this.list.length >= this.total) this.status = 'nomore'
          else this.status = 'loadmore'
        })
    },
    getBottom(e) {
      if (this.list.length >= this.total || this.status === 'loading') return
      this.status = 'loading'
      this.pageIndex = ++this.pageIndex
      setTimeout(() => {
        this.getList()
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.maintainlis {
  width: 100%;
  .searchsty {
    background: #fff;
    border-radius: 3rpx;
    font-size: 23rpx;
    border: solid 1px #dfdfdf;
    padding: 0px;
    line-height: 63rpx;
    margin-bottom: 32rpx;
    ::v-deep .u-form-item--left__content {
      padding-left: 13rpx;
    }
    ::v-deep .u-input__input {
      font-size: 23rpx;
      min-height: 63rpx !important;
    }
    .custom-style {
      border: 0px;
      border-left: 1px solid #dfdfdf;
      width: 120rpx;
      color: #006fe6;
      height: 63rpx;
      font-size: 23rpx;
      background-color: #f5f6fa;
    }
  }
  .contsty {
    height: calc(100vh - 295rpx);
    overflow: auto;
    .listy {
      background-color: #f5f6fa;
      border-radius: 5rpx;
      overflow: hidden;
      position: relative;
      margin-bottom: 25rpx;
      .fontsty {
        color: #006fe6;
        font-family: MicrosoftYaHei-Bold;
      }
      .namesty {
        color: #323232;
        font-family: MicrosoftYaHei-Bold;
      }
      .leftsty {
        line-height: 50rpx;
        background-color: #f0f1f6;
      }
      .itemsty {
        font-size: 18rpx;
        color: #969696;
        margin-bottom: 30rpx;
      }
      .itemstys {
        font-size: 18rpx;
        color: #969696;
      }
      .valuesty {
        display: inline-block;
        margin-left: 15rpx;
        line-height: 18rpx;
        color: #323232;
      }
      .subscript {
        color: #fff;
        height: 30rpx;
        width: 100rpx;
        position: absolute;
        right: -30rpx;
        font-size: 18rpx;
        text-align: center;
        line-height: 30rpx;
        background-color: #006fe6;
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 5rpx;
      }
    }
  }
}
</style>