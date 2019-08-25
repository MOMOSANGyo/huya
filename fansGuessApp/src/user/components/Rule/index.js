import React from 'react'
import './index.scss'

const Rule = () => {
    return (
        <div className="rule">
            <div className="rule_title">
                游戏规则
            </div>
            <div className="rule_content">
            <p>在规定时间内，主播要描述一个词语，观众根据主播描述猜词。</p>
            <p>猜中一词得1分，猜错不得分，答题快的人排名领先。</p>
            <p>每轮游戏10个词语，一轮游戏结束后公布排名比分。</p>
            </div>
        </div>
    )
}

export default Rule;