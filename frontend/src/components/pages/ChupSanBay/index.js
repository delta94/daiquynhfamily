import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchList, fetchNextList } from 'redux/reducers/chupsanbay'
import { openModal, closeModal } from 'redux/reducers/modal'
import withAsyncLoader from 'utils/hoc/withAsyncLoader'
import Button from 'components/atoms/Button'
import Heading from 'components/atoms/Heading'
import ResponsiveImages from 'components/molecules/ResponsiveImages'
import ResponsiveImageModal from 'components/molecules/ResponsiveImageModal'
import PageLayout from 'components/templates/PageLayout'

const PageContent = ({
  modal: {
    type,
    args: { src },
  },
  list,
  allowNextPage,
  fetchNextList,
  openDetailModal,
  closeDetailModal,
}) => (
  <>
    {type && <ResponsiveImageModal src={src} onClose={closeDetailModal} />}
    <Heading>Tình yêu lớn không phải yêu nhiều người mà là yêu một người và suốt đời.</Heading>
    <ResponsiveImages list={list} onClick={openDetailModal} />
    {allowNextPage && (
      <Button style={{ width: '50%' }} onClick={fetchNextList}>
        Load more
      </Button>
    )}
  </>
)

const EnhancedPageContent = compose(
  connect(
    state => ({
      list: state.chupsanbay.list,
      allowNextPage: state.chupsanbay.allowNextPage,
      modal: state.modal,
    }),
    dispatch => bindActionCreators({ fetchList, fetchNextList, openModal, closeModal }, dispatch),
  ),
  withAsyncLoader(props => props.fetchList()),
  withHandlers({
    openDetailModal: ({ openModal }) => args => openModal({ type: 'DETAIL', args }),
    closeDetailModal: ({ closeModal }) => () => closeModal(),
  }),
)(PageContent)

const Page = props => (
  <PageLayout currentPath="/chupsanbay">
    <EnhancedPageContent {...props} />
  </PageLayout>
)

export default Page
