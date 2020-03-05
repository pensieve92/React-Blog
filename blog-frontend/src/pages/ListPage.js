import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
// import PostList from 'components/list/PostList';
// import Pagination from 'components/list/Pagination';
import ListContainer from 'containers/list/Listcontainer';

const ListPage = ({match}) => {
    // page의 기본 값을 1로 설정합니다.
    const { page = 1, tag } = match.params;

    return (
        <PageTemplate>
            <ListWrapper>
                <ListContainer
                    page={parseInt(page, 10)}
                    tag= {tag}
                    />
            </ListWrapper>
        </PageTemplate>
    )
};

export default ListPage;