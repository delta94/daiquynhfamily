import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchList, fetchNextList } from 'redux/reducers/chupstudio'
import asyncLoader from 'utils/hoc/asyncLoader'
import Button from 'components/atoms/Button'
import Heading from 'components/atoms/Heading'
import ResponsiveImages from 'components/molecules/ResponsiveImages'
import PageLayout from 'components/templates/PageLayout'

const PageContent = ({ list, fetchNextList: fetchNextListAct }) => (
  <>
    <Heading>
      Tình yêu là trạng thái mà khi đó hạnh phúc của một người khác trở nên cực kỳ quan trọng đối
      với hạnh phúc của bạn.
    </Heading>
    <ResponsiveImages list={list} />
    <Button style={{ width: '50%' }} onClick={() => fetchNextListAct()}>
      Load more
    </Button>
  </>
)

const EnhancedPageContent = compose(
  connect(
    state => ({ list: state.chupstudio.list }),
    dispatch => bindActionCreators({ fetchList, fetchNextList }, dispatch),
  ),
  asyncLoader(props => props.fetchList()),
)(PageContent)

const Page = props => (
  <PageLayout currentPath="/chupstudio">
    <EnhancedPageContent {...props} />
  </PageLayout>
)

export default Page
