import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import MediaCard from '../Cards/Media/MediaCard'
import MediaCardLarge from '../Cards/Media/MediaCardLarge'
import LoadingMediaCard from '../Loading/LoadingMediaCard'
import LoadingMediaCardLarge from '../Loading/LoadingMediaCardLarge'

class Collection extends Component {
  render () {
    let { title, titleTag: TitleTag = 'h3', showTitle = true, perPage = 4, mediaIds, media, loading = false, size = 'sm', ...attr } = this.props
    const width = 12 / perPage
    const Tag = size === 'sm' ? MediaCard : MediaCardLarge
    const LoadingTag = size === 'sm'
      ? LoadingMediaCard
      // quickly check to show smaller version on mobile
      : window.matchMedia('(max-width: 576px)').matches
        ? LoadingMediaCard
        : LoadingMediaCardLarge
    return (
      <Fragment>
        {showTitle && title && <TitleTag className='border-bottom pb-3 mb-4'>{title}</TitleTag>}
        <div className='row'>
          {
            loading
              ? [...Array(10).keys()].map((index) => <LoadingTag width={width} key={`loadingMediaCard-${index}`} />)
              : mediaIds.map((mediaId) => <Tag width={width} media={media[mediaId]} key={`mediaCard-${mediaId}`} {...attr} />)
          }
        </div>
      </Fragment>
    )
  }
}

export default connect((store) => {
  return {
    media: store.Data.media
  }
})(Collection)