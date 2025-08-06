// packages/shell/src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const features = [
    {
      title: '组件市场',
      description: '浏览、下载和管理各类流程组件，丰富你的设计工具箱',
      link: '/marketplace',
      icon: '🛒',
    },
    {
      title: '版本管理',
      description: '追踪流程设计历史，支持版本对比和一键回滚',
      link: '/versions',
      icon: '📦',
    },
    {
      title: '实时预览',
      description: '所见即所得的预览系统，实时查看流程运行效果',
      link: '/preview',
      icon: '👁️',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          FlowCraft
          <br />
          <span style={{
            background: 'linear-gradient(45deg, #fff, #f0f9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            智能业务流程构建平台
          </span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          marginBottom: '3rem',
          opacity: 0.9,
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          通过 AI 辅助设计、可视化流程编排、实时协作和智能组件推荐，
          让非技术人员也能快速构建复杂的业务流程应用
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '4rem',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/designer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.2s ease'
            }}
          >
            ▶️ 开始设计
          </Link>

          <Link
            to="/demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              border: '2px solid white',
              transition: 'all 0.2s ease'
            }}
          >
            👁️ 查看演示
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {['200+', '500+', '5K+', '98%'].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>
                {stat}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8
              }}>
                {['企业用户', '流程模板', '月活用户', '满意度'][index]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#333'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#111827'
          }}>
            核心功能特性
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#111827'
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.875rem'
                  }}
                >
                  了解更多 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#111827',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>
            准备开始构建您的业务流程？
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '2.5rem'
          }}>
            立即体验 FlowCraft 的强大功能，只需几分钟即可创建专业的业务流程应用
          </p>

          <Link
            to="/designer"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.2s ease'
            }}
          >
            免费开始使用
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;