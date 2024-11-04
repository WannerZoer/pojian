export const mockData = {
  article: {
    items: {
      caixin: [
        {
          id: 'article1',
          title: '【公司速递】洋河第三季度净利大降七成 压不动货还是主动降速？',
          source: '财新网 - 最新文章',
          author: '小刘鸭酱',
          time: '2024/1/11 12:23:05',
          views: 10,
          quote: '"在产品销售下移，库存积压显著下，经销商呼吁酒企主动降速，为渠道减负"',
          image: '/news/company-report.jpg',
          content: '详细的文章内容...',
          originalUrl: 'https://example.com/original-article',
          isRead: false
        },
        {
          id: 'article2',
          title: '新能源汽车市场竞争加剧，多家车企下调售价',
          source: '财新网 - 最新文章',
          author: '张记者',
          time: '2024/1/11 10:15:00',
          views: 156,
          quote: '"市场竞争加剧导致价格战持续升级，消费者或将从中受益"',
          image: '/news/ev-market.jpg',
          content: '详细的文章内容...',
          originalUrl: 'https://example.com/article2',
          isRead: false
        },
        {
          id: 'article3',
          title: '央行：继续实施稳健的货币政策',
          source: '财新网 - 最新文章',
          author: '王分析',
          time: '2024/1/11 09:30:00',
          views: 289,
          quote: '"保持流动性合理充裕，引导金融机构加大对实体经济的支持力度"',
          image: '/news/central-bank.jpg',
          content: '详细的文章内容...',
          originalUrl: 'https://example.com/article3',
          isRead: true
        }
      ]
    },
    favorites: [],
    sources: {
      caixin: '财新网 - 最新文章'
    }
  },
  social: {
    items: {
      twitter: [
        {
          id: 'social1',
          content: '重要的社交媒体更新...',
          author: '科技观察者',
          time: '2024/1/11 11:00:00',
          likes: 45,
          comments: 12,
          shares: 8,
          isRead: false
        }
      ],
      weibo: []
    },
    favorites: [],
    sources: {
      twitter: 'Twitter Feed',
      weibo: '微博热门'
    }
  },
  video: {
    items: {
      youtube: [],
      bilibili: [
        {
          id: 'video1',
          title: '最新科技评测视频',
          author: '科技达人',
          time: '2024/1/11 08:00:00',
          views: 1234,
          duration: '10:24',
          isRead: false
        }
      ]
    },
    favorites: [],
    sources: {
      youtube: 'YouTube',
      bilibili: 'Bilibili'
    }
  },
  image: {
    items: {
      photos: [],
      gallery: []
    },
    favorites: [],
    sources: {
      photos: 'Photo Stream',
      gallery: 'Gallery'
    }
  },
  audio: {
    items: {
      podcasts: [],
      music: []
    },
    favorites: [],
    sources: {
      podcasts: 'Podcasts',
      music: 'Music'
    }
  },
  message: {
    items: {
      inbox: [
        {
          id: 'msg1',
          subject: '项目更新通知',
          sender: '项目经理',
          content: '请查看最新的项目进度报告...',
          time: '2024/1/11 14:30:00',
          isRead: false
        }
      ],
      sent: []
    },
    favorites: [],
    sources: {
      inbox: 'Inbox',
      sent: 'Sent'
    }
  }
};